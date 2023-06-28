import { ReactNode } from "react";
import { siteConfig } from "@/app/site-config";
import { Pager } from "@/components/pager";
import { DocsSidebarNav } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { EditPageMeta } from "./edit-page-meta";

export default function DocsLayout(props: { children: ReactNode }) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[256px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 -mr-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <ScrollArea className="py-6 pr-4 lg:py-8">
          <DocsSidebarNav items={siteConfig.sidebarNav} />
        </ScrollArea>
      </aside>
      <main className="max-w-3xl pb-16">
        {props.children}
        <EditPageMeta className="mt-16" />
        <Pager className="mt-4 border-t pt-6" />
      </main>
    </div>
  );
}
