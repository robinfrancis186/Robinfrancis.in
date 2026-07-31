import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { cn } from "@/lib/utils";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.path}-${item.name}`} className="flex min-w-0 items-start gap-2">
              {index > 0 ? (
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              ) : null}
              {isCurrent ? (
                <span aria-current="page" className="min-w-0 font-medium text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
