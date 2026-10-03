// Shared bits of the blog pages: the post date format and the PillBadge
// classes for a post's date and tags.

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

// PillBadge backgrounds: the date is blue and tags are pink by day, in the
// homepage's sea and bramble at night. Borders go cream at night.
export const pill = {
  date: "bg-[#e6f0ff] dark:bg-sea",
  tag: "bg-[#fff0f0] dark:bg-bramble",
  border: "dark:border-ink/80",
} as const;
