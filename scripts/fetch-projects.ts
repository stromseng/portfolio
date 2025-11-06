#!/usr/bin/env bun
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { dump as toYaml } from "js-yaml";
import { allProjectsQuery } from "../src/sanity.queries";
import type { AllProjectsQueryResult } from "../sanity.types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../src/data/projects");
const PUBLIC_PROJECTS_DIR = path.join(__dirname, "../public/projects");

const projectId = process.env.SANITY_PROJECT_ID || "xxc5ksdw";
const dataset = process.env.SANITY_DATASET || "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder({ projectId, dataset });

type Project = AllProjectsQueryResult[number];
type PortableTextBlock = NonNullable<Project["body"]>[number];
type ProjectImage = NonNullable<Project["images"]>[number];
type ProcessedImage = { src: string; alt?: string };

const main = async () => {
  const projects = (await client.fetch(
    allProjectsQuery,
  )) as AllProjectsQueryResult;

  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(PUBLIC_PROJECTS_DIR, { recursive: true });
  await clearMarkdownOutput();

  for (const project of projects) {
    const slug = project?.slug?.current;
    if (!slug) {
      console.warn(
        `Skipping project without slug: ${project?._id ?? "(unknown id)"}`,
      );
      continue;
    }

    const projectAssetsDir = path.join(PUBLIC_PROJECTS_DIR, slug);
    await mkdir(projectAssetsDir, { recursive: true });
    await clearDirectory(projectAssetsDir);

    const mainImage = await downloadProjectImage(
      project.mainImage,
      slug,
      "main",
    );

    const galleryImages: ProcessedImage[] = [];
    if (project.images?.length) {
      let index = 1;
      for (const image of project.images) {
        const processed = await downloadProjectImage(
          image,
          slug,
          `gallery-${index}`,
        );
        if (processed) {
          galleryImages.push(processed);
          index += 1;
        }
      }
    }

    const frontmatter = buildFrontmatter(project, slug, {
      mainImage,
      galleryImages,
    });
    const frontmatterBlock = toYaml(frontmatter, {
      lineWidth: 0,
      noRefs: true,
    }).trimEnd();

    const markdownBody = portableTextToMarkdown(project.body ?? []).trim();
    const bodySection = markdownBody ? `\n\n${markdownBody}\n` : "\n";
    const fileContents = `---\n${frontmatterBlock}\n---${bodySection}`;

    const filePath = path.join(OUTPUT_DIR, `${slug}.mdx`);
    await writeFile(filePath, fileContents, "utf8");
    console.log(`Wrote ${filePath}`);
  }
};

async function clearMarkdownOutput() {
  await clearDirectory(OUTPUT_DIR, (entry) => entry.name.endsWith(".mdx"));
}

async function clearDirectory(
  directory: string,
  filter?: (entry: Dirent) => boolean,
) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    await Promise.all(
      entries
        .filter((entry) => (filter ? filter(entry) : true))
        .map((entry) =>
          rm(path.join(directory, entry.name), {
            recursive: entry.isDirectory(),
            force: true,
          }),
        ),
    );
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}

async function downloadProjectImage(
  image: ProjectImage | Project["mainImage"],
  slug: string,
  basename: string,
): Promise<ProcessedImage | undefined> {
  const assetRef = image?.asset?._ref;
  if (!image || !assetRef) {
    return undefined;
  }

  const extension = getExtensionFromAssetRef(assetRef);
  const url = builder.image(image).fit("max").url();

  if (!url) {
    console.warn(`Unable to resolve URL for asset ${assetRef}`);
    return undefined;
  }

  const response = await fetch(url);
  if (!response.ok) {
    console.warn(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
    return undefined;
  }

  const arrayBuffer = await response.arrayBuffer();
  const fileName = `${basename}.${extension}`;
  const filePath = path.join(PUBLIC_PROJECTS_DIR, slug, fileName);
  await writeFile(filePath, new Uint8Array(arrayBuffer));

  return {
    src: `/projects/${slug}/${fileName}`,
    alt: image.alt?.trim() || undefined,
  };
}

function getExtensionFromAssetRef(assetRef: string): string {
  const parts = assetRef.split("-");
  const extCandidate = parts[parts.length - 1];
  const match = /^([a-zA-Z0-9]+)$/.exec(extCandidate);
  return match ? match[1] : "jpg";
}

function buildFrontmatter(
  project: Project,
  slug: string,
  images: { mainImage?: ProcessedImage; galleryImages: ProcessedImage[] },
) {
  const tags =
    project.tags
      ?.map((tag) => tag?.trim())
      .filter((tag): tag is string => Boolean(tag && tag.length > 0)) ?? [];

  const frontmatter: Record<string, unknown> = {
    title: project.title ?? "Untitled Project",
    slug,
  };

  if (project.shortDescription?.trim()) {
    frontmatter.shortDescription = project.shortDescription.trim();
  }
  if (project.projectType) {
    frontmatter.projectType = project.projectType;
  }
  if (tags.length) {
    frontmatter.tags = tags;
  }
  if (project.hostedLink) {
    frontmatter.hostedLink = project.hostedLink;
  }
  if (project.githubLink) {
    frontmatter.githubLink = project.githubLink;
  }
  if (project.newIndicator) {
    frontmatter.newIndicator = project.newIndicator;
  }
  if (project.newIndicatorText?.trim()) {
    frontmatter.newIndicatorText = project.newIndicatorText.trim();
  }
  if (typeof project.sortOrder === "number") {
    frontmatter.sortOrder = project.sortOrder;
  }
  if (images.mainImage) {
    frontmatter.mainImage = images.mainImage;
  }
  if (images.galleryImages.length) {
    frontmatter.images = images.galleryImages;
  }

  return frontmatter;
}

function portableTextToMarkdown(blocks: PortableTextBlock[]): string {
  const lines: string[] = [];
  let listBuffer: {
    type: "bullet" | "number";
    text: string;
    level: number;
  }[] = [];

  const flushList = () => {
    if (!listBuffer.length) return;
    for (const item of listBuffer) {
      const indent = "  ".repeat(Math.max(0, item.level - 1));
      const prefix = item.type === "number" ? "1." : "-";
      lines.push(`${indent}${prefix} ${item.text}`);
    }
    listBuffer = [];
  };

  for (const block of blocks) {
    if (!block || block._type !== "block" || !block.children?.length) {
      continue;
    }

    const text = block.children
      .map((child) => formatChild(child, block.markDefs ?? []))
      .join("");

    if (!text.trim()) {
      continue;
    }

    if (block.listItem === "bullet" || block.listItem === "number") {
      listBuffer.push({
        type: block.listItem,
        text,
        level: block.level ?? 1,
      });
      continue;
    }

    flushList();

    switch (block.style) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6": {
        const depth = Number(block.style.slice(1));
        lines.push(`${"#".repeat(depth)} ${text}`);
        break;
      }
      case "blockquote":
        lines.push(`> ${text}`);
        break;
      default:
        lines.push(text);
    }
  }

  flushList();

  return lines.join("\n\n");
}

type PortableTextChild = NonNullable<PortableTextBlock["children"]>[number];

function formatChild(
  child: PortableTextChild,
  markDefs: PortableTextBlock["markDefs"] = [],
): string {
  let result = child.text ?? "";

  if (!child.marks?.length) {
    return result;
  }

  for (const mark of child.marks) {
    switch (mark) {
      case "strong":
        result = `**${result}**`;
        break;
      case "em":
        result = `*${result}*`;
        break;
      case "code":
        result = `\`${result}\``;
        break;
      default: {
        const def = markDefs.find((definition) => definition._key === mark);
        if (def?._type === "link" && def.href) {
          result = `[${result}](${def.href})`;
        }
        break;
      }
    }
  }

  return result;
}

main().catch((error) => {
  console.error("Failed to export projects:", error);
  process.exitCode = 1;
});
