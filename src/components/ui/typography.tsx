import * as React from "react";
import { cn } from "@/lib/utils";

export interface TypographyH1Props
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH1({ className, ...props }: TypographyH1Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

export interface TypographyH2Props
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH2({ className, ...props }: TypographyH2Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  );
}

export interface TypographyH3Props
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH3({ className, ...props }: TypographyH3Props) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export interface TypographyH4Props
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH4({ className, ...props }: TypographyH4Props) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export interface TypographyPProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function TypographyP({ className, ...props }: TypographyPProps) {
  return <p className={cn("leading-7 not-first:mt-6", className)} {...props} />;
}

export interface TypographyBlockquoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {}

export function TypographyBlockquote({
  className,
  ...props
}: TypographyBlockquoteProps) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  );
}

export interface TypographyTableProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function TypographyTable({ className, ...props }: TypographyTableProps) {
  return (
    <div className={cn("my-6 w-full overflow-y-auto", className)} {...props} />
  );
}

export interface TypographyListProps
  extends React.HTMLAttributes<HTMLUListElement> {}

export function TypographyList({ className, ...props }: TypographyListProps) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  );
}

export interface TypographyInlineCodeProps
  extends React.HTMLAttributes<HTMLElement> {}

export function TypographyInlineCode({
  className,
  ...props
}: TypographyInlineCodeProps) {
  return (
    <code
      className={cn(
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className,
      )}
      {...props}
    />
  );
}

export interface TypographyLeadProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function TypographyLead({ className, ...props }: TypographyLeadProps) {
  return (
    <p className={cn("text-muted-foreground text-xl", className)} {...props} />
  );
}

export interface TypographyLargeProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function TypographyLarge({ className, ...props }: TypographyLargeProps) {
  return <div className={cn("text-lg font-semibold", className)} {...props} />;
}

export interface TypographySmallProps
  extends React.HTMLAttributes<HTMLElement> {}

export function TypographySmall({ className, ...props }: TypographySmallProps) {
  return (
    <small
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    />
  );
}

export interface TypographyMutedProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function TypographyMuted({ className, ...props }: TypographyMutedProps) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
}
