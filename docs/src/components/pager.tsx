"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/app/site-config";
import { cn } from "@/lib/cn";

import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";

interface PagerProps {
  className?: string;
}

const getNavMenuIndices = (pathname: string) => {
  return siteConfig.sidebarNav.reduce(
    (acc, item, index) => {
      const subIndex = item.items.findIndex(
        (subItem) => subItem.href === pathname,
      );
      if (subIndex !== -1) {
        return { subIndex, index };
      }
      return acc;
    },
    { subIndex: -1, index: -1 },
  );
};

const getBack = ({ subIndex, index }: ReturnType<typeof getNavMenuIndices>) => {
  if (subIndex === -1 || index === -1) {
    return undefined;
  }

  const outerMenu = siteConfig.sidebarNav[index];

  if (subIndex === 0) {
    const prevMenu = siteConfig.sidebarNav?.[index - 1];
    if (prevMenu) {
      return prevMenu.items?.[prevMenu.items.length - 1];
    }
  }

  return outerMenu.items?.[subIndex - 1];
};

const getTo = ({ subIndex, index }: ReturnType<typeof getNavMenuIndices>) => {
  if (subIndex === -1 || index === -1) {
    return undefined;
  }

  const outerMenu = siteConfig.sidebarNav[index];

  if (outerMenu.items.length <= subIndex + 1) {
    const nextMenu = siteConfig.sidebarNav?.[index + 1];
    if (nextMenu) {
      return nextMenu.items?.[0];
    }
  }

  return outerMenu.items?.[subIndex + 1];
};

export function Pager({ className }: PagerProps) {
  const pathname = usePathname();
  const { subIndex, index } = getNavMenuIndices(pathname);
  const to = getTo({ subIndex, index });
  const back = getBack({ subIndex, index });
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
          {back.title}
        </Link>
      )}
      {to && (
        <Link href={to.href} className={buttonVariants({ variant: "outline" })}>
          {to.title}
          <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
