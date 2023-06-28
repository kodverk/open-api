"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface EditPageMetaProps {
  meta?: {
    updatedAt: string;
    updatedBy: string;
  };
  className?: string;
}

export function EditPageMeta({ meta, className }: EditPageMetaProps) {
  const segments = useSelectedLayoutSegments();
  console.log("segments", segments);
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
        href="https://github.com/kodverk/open-api/tree/main/docs/src/app"
        className={buttonVariants({ variant: "ghost" })}
      >
        <Icons.pen className="mr-2 h-4 w-4" />
        Edit this page
      </a>
      {meta && (
        <div className="text-sm text-gray-500">
          Last updated on {meta.updatedAt} by {meta.updatedBy}
        </div>
      )}
    </div>
  );
}
