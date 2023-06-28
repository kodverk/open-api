import Link from "next/link";
import { cn } from "@/lib/cn";

import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";

interface PagerProps {
  to?: {
    href: string;
    label: string;
  };
  back?: {
    href: string;
    label: string;
  };
  className?: string;
}

export function Pager({ to, back, className }: PagerProps) {
  return (
    <div
      className={cn("flex flex-row items-center justify-between", className, {
        "justify-end": !back,
        "justify-start": !to,
        "space-x-2": to && back,
      })}
    >
      {back && (
        <Link
          href={back.href}
          className={buttonVariants({ variant: "outline" })}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          {back.label}
        </Link>
      )}
      {to && (
        <Link href={to.href} className={buttonVariants({ variant: "outline" })}>
          {to.label}
          <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
