export interface UnistNode extends Node {
  type: string;
  name?: string;
  tagName?: string;
  value?: string;
  properties?: {
    __rawString__?: string;
    [key: string]: unknown;
  } & NpmCommands;
  children?: UnistNode[];
}

export interface UnistTree extends Node {
  children: UnistNode[];
  type: string
}

export interface NpmCommands {
  __npmCommand__?: string;
  __yarnCommand__?: string;
  __pnpmCommand__?: string;
}
