/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import withMdx from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { getHighlighter } from "shiki";
import { visit } from "unist-util-visit";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  redirects: () => [
    { source: "/docs", destination: "/docs/introduction", permanent: true },
  ],
};

export default withMdx({
  options: {
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;
            if (codeEl.tagName !== "code") {
              return;
            }
            if (node.__rawString__ === undefined) {
              node.__rawString__ = codeEl.children?.[0].value;
            }
          }
        });
      },
      [
        rehypePrettyCode,
        /** @type {import("rehype-pretty-code").Options} */
        ({
          theme: { dark: "one-dark-pro", light: "github-light" },
          getHighlighter,
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node, id) {
            node.properties.className = ["word"];
            node.properties["data-word-id"] = id;
          },
        }),
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return;
            }
            const preElement = node.children.at(-1);
            if (preElement.tagName !== "pre") {
              return;
            }
            preElement.properties["__rawString__"] = node.__rawString__;
            if (node.__rawString__.startsWith("npm install")) {
              const npmCommand = node.__rawString__;
              preElement.properties["__npmCommand__"] = npmCommand;
              preElement.properties["__yarnCommand__"] = npmCommand.replace(
                "npm install",
                "yarn add",
              );
              preElement.properties["__pnpmCommand__"] = npmCommand.replace(
                "npm install",
                "pnpm add",
              );
            }

            console.log(preElement.properties);
          }
        });
      },
    ],
  },
})(nextConfig);
