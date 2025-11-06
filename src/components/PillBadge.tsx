import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { createElement } from "react";

const baseClasses = cn(
  "inline-flex w-fit items-center rounded-[9999px] border-[3px] border-black font-semibold uppercase tracking-[0.3em] px-4 py-1 text-[11px]",
);

type PillBadgeProps<E extends ElementType = "span"> = {
  as?: E;
  background?: string;
  className?: string;
} & ComponentPropsWithoutRef<E>;

const PillBadge = <E extends ElementType = "span">({
  as,
  background = "bg-white",
  className,
  children,
  ...rest
}: PillBadgeProps<E>) => {
  const Tag = (as ?? "span") as ElementType;
  const finalClassName = [baseClasses, background, className]
    .filter(Boolean)
    .join(" ");

  return createElement(
    Tag,
    {
      ...rest,
      className: finalClassName,
    },
    children,
  );
};

export default PillBadge;
