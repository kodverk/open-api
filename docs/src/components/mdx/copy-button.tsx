"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/cn";
import { NpmCommands } from "@/types/unist";
import { CheckCheck, Copy } from "lucide-react";

function copyToClipboard(text: string) {
  void window.navigator.clipboard.writeText(text);
}

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  const copy = (text: string) => {
    console.log({ copy: text });
    copyToClipboard(text);
    setCopied(true);
  };

  return { copied, copy } as const;
};

interface CopyButtonProps {
  theme: string;
  rawString: string;
  className?: string;
}

export function CopyButton({ className, theme, rawString }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <button
      aria-label="Copy to Clipboard"
      data-theme={theme}
      onClick={() => copy(rawString)}
      className={cn(
        "h-8 w-8 cursor-pointer rounded text-muted-foreground hover:bg-muted",
        className,
      )}
    >
      <div className="relative h-full w-full p-1">
        <Copy
          className={cn(
            "absolute h-6 w-6 p-0 transition-all",
            copied && "scale-0",
          )}
        />
        <CheckCheck
          className={cn(
            "absolute h-6 w-6 scale-0 p-0 transition-all",
            copied && "scale-100",
          )}
        />
      </div>
    </button>
  );
}

interface NpmCommandCopyButtonProps {
  theme: string;
  commands: Required<NpmCommands>;
  className?: string;
}

export function NpmCommandCopyButton({
  className,
  commands,
  theme,
}: NpmCommandCopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = (text: string) => {
    copy(text);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          data-theme={theme}
          className={cn(
            "h-8 w-8 cursor-pointer rounded text-muted-foreground hover:bg-muted",
            className,
          )}
        >
          <div className="relative h-full w-full p-1">
            <Copy
              className={cn(
                "absolute h-6 w-6 p-0 transition-all",
                copied && "scale-0",
              )}
            />
            <CheckCheck
              className={cn(
                "absolute h-6 w-6 scale-0 p-0 transition-all",
                copied && "scale-100",
              )}
            />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <button
            className="w-full"
            value="pnpm"
            onClick={() => handleCopy(commands.__pnpmCommand__)}
          >
            pnpm
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="w-full"
            value="npm"
            onClick={() => handleCopy(commands.__npmCommand__)}
          >
            npm
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="w-full"
            value="yarn"
            onClick={() => handleCopy(commands.__yarnCommand__)}
          >
            yarn
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
