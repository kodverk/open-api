"use client";

import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface EditPageMetaProps {
  className?: string;
}

export function EditPageMeta({ className }: EditPageMetaProps) {
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/docs");
  const route = pathname.split("/").pop();
  if (!isDocs || !route) return null;
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between space-x-2",
        className,
      )}
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://github.com/kodverk/open-api/edit/main/docs/src/app/docs/${route}/page.mdx`}
        className={buttonVariants({ variant: "link" })}
      >
        <Icons.pen className="mr-2 h-4 w-4" />
        Edit this page
      </a>
    </div>
  );
}
