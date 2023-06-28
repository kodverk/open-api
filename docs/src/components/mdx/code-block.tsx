"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { NpmCommands } from "@/types/npm-commands";

import { Icons } from "../icons";
import { CopyButton, NpmCommandCopyButton } from "./copy-button";

export type CodeblockProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  "data-language"?: string;
  "data-theme"?: string;
};

export function Codeblock(props: CodeblockProps) {
  const { children, ...rest } = props;
  const language = props["data-language"] as string;
  const theme = props["data-theme"] as string;
  const [commands, setCommands] = useState<NpmCommands | null>(null);
  const [rawString, setRawString] = useState("");

  const Icon = {
    js: Icons.javascript,
    ts: Icons.typescript,
    prisma: Icons.prisma,
    bash: Icons.bash,
  }[language];

  const ref = useRef<HTMLPreElement>(null);

  useLayoutEffect(() => {
    if (!ref.current?.innerText) return;
    const content = ref.current.innerText;
    if (!content?.startsWith("npm install")) {
      return setRawString(content);
    }
    return setCommands({
      npmCommand: content,
      pnpmCommand: content.replace("npm install", "pnpm add"),
      yarnCommand: content.replace("npm install", "yarn add"),
    });
  }, [ref.current]);

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
      {commands && (
        <NpmCommandCopyButton
          className="absolute right-2 top-[10px] z-20"
          commands={commands}
          theme={theme}
        />
      )}
      {!commands && rawString && (
        <CopyButton
          className="absolute right-2 top-[10px] z-20"
          theme={theme}
          rawString={rawString}
        />
      )}
    </>
  );
}
