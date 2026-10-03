// Classes for rendered markdown (blog posts and project write-ups), for
// `class:list`. Black-on-paper prose by day. At night: cream text,
// lamp-coloured links and faint rules. Shiki's dark code blocks read as they
// are, so they only get an edge to sit on. Embedded HTML that paints its own
// background keeps dark text, so it stays readable at night.
export const prose = [
  "prose text-black prose-headings:text-black prose-p:text-black prose-a:text-black prose-strong:text-black prose-li:text-black",
  "dark:text-ink dark:prose-headings:text-ink dark:prose-p:text-ink dark:prose-a:text-lamp dark:prose-strong:text-ink dark:prose-li:text-ink dark:prose-blockquote:border-ink/30 dark:prose-blockquote:text-ink-soft dark:prose-code:text-ink dark:prose-pre:ring-1 dark:prose-pre:ring-ink/20 dark:prose-th:text-ink dark:prose-hr:border-ink/20 dark:prose-thead:border-ink/30 dark:prose-tr:border-ink/15 dark:marker:text-ink-soft",
  "dark:[&_[style*=background]]:text-[#172238] dark:[&_[style*=background]_*]:text-[#172238]",
];
