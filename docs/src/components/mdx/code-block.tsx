"use client";

import { useRef } from "react";

import { Icons } from "../icons";

export type CodeblockProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  /** set by `rehype-pretty-code` */
  "data-language"?: string;
  /** set by `rehype-pretty-code` */
  "data-theme"?: string;
};

export function Codeblock(props: CodeblockProps) {
  const { children, ...rest } = props;
  const language = props["data-language"] as string;
  const theme = props["data-theme"] as string;
  const Icon = {
    js: Icons.javascript,
    ts: Icons.typescript,
    prisma: Icons.prisma,
    bash: Icons.bash,
  }[language];

  const ref = useRef<HTMLPreElement>(null);

  return (
    <>
      {Icon && (
        <Icon
          data-language-icon
          data-theme={theme}
          className="absolute left-4 top-4 z-20 h-5 w-5 text-foreground"
        />
      )}
      <pre
        ref={ref}
        className="my-4 overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm font-semibold text-muted-foreground"
        {...rest}
      >
        {children}
      </pre>
    </>
  );
}
