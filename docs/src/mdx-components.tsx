import * as React from "react";
import Link from "next/link";
import { Callout } from "@/components/mdx/callout";
import { Codeblock } from "@/components/mdx/code-block";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="mt-10 scroll-m-20 font-cal text-4xl" {...props} />
    ),
    h2: (props) => (
      <h2
        className="mt-10 scroll-m-20 border-b pb-2 font-cal text-3xl first:mt-0"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="mt-8 scroll-m-20 font-cal text-2xl" {...props} />
    ),
    h4: (props) => (
      <h4 className="-mb-4 mt-6 scroll-m-20 font-cal text-2xl" {...props} />
    ),
    p: (props) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
    ),
    a: ({ children, href }) => {
      const isExternal = href?.startsWith("http");
      const Component = isExternal ? "a" : Link;
      return (
        <Component
          href={href as string}
          className="underline decoration-primary decoration-2 underline-offset-4"
        >
          {children}
        </Component>
      );
    },
    ul: (props) => <ul className="mt-4 list-disc pl-8" {...props} />,
    blockquote: (props) => (
      <blockquote className="mt-4 border-l-4 pl-4" {...props} />
    ),
    code: (props) => (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-muted-foreground"
        {...props}
      />
    ),
    pre: ({ ...props }: React.HTMLAttributes<HTMLPreElement>) => {
      return <Codeblock {...props} />;
    },
    img: (props) => <img {...props} className="rounded-lg" />,
    Callout,
    Steps: ({ ...props }) => (
      <div
        className="[&>h3]:step mb-12 ml-4 border-l pl-6 [counter-reset:step]"
        {...props}
      />
    ),

    ...components,
  };
}
