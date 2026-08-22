/**
 * Portable Text → Markdown, for the `Accept: text/markdown` variant of an
 * article. Deliberately small: it covers the block types the studio can
 * actually produce and drops anything else rather than guessing at a
 * representation, since a wrong one is worse than a missing paragraph.
 */

import { urlFor } from "../sanity/lib/image";

type Span = {
  _type: string;
  _key?: string;
  text?: string;
  marks?: string[];
};

type MarkDef = {
  _key: string;
  _type: string;
  href?: string;
};

type Block = {
  _type: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: Span[];
  markDefs?: MarkDef[];
  asset?: { _ref?: string };
  alt?: string;
};

const HEADING_PREFIX: Record<string, string> = {
  h1: "#",
  h2: "##",
  h3: "###",
  h4: "####",
  h5: "#####",
  h6: "######",
};

/** Escapes the characters that would otherwise start a block of their own. */
function escapeText(text: string): string {
  return text.replace(/([\\`*_[\]])/g, "\\$1");
}

function renderSpan(span: Span, markDefs: MarkDef[]): string {
  if (span._type !== "span") return "";

  let text = escapeText(span.text ?? "");
  if (!text) return "";

  // Annotations (links) are keys into markDefs; the rest are literal decorators.
  for (const mark of span.marks ?? []) {
    if (mark === "strong") text = `**${text}**`;
    else if (mark === "em") text = `_${text}_`;
    else if (mark === "code") text = `\`${span.text ?? ""}\``;
    else if (mark === "underline" || mark === "strike-through") continue;
    else {
      const def = markDefs.find((candidate) => candidate._key === mark);
      if (def?._type === "link" && def.href) text = `[${text}](${def.href})`;
    }
  }

  return text;
}

function renderBlock(block: Block): string | null {
  if (block._type === "image") {
    if (!block.asset?._ref) return null;
    const url = urlFor({ asset: { _ref: block.asset._ref } })
      .width(1600)
      .fit("max")
      .auto("format")
      .url();
    return `![${block.alt ?? ""}](${url})`;
  }

  if (block._type !== "block") return null;

  const text = (block.children ?? [])
    .map((child) => renderSpan(child, block.markDefs ?? []))
    .join("");

  if (!text.trim()) return null;

  if (block.listItem) {
    // Sanity's `level` is 1-based; each extra level is one two-space indent.
    const indent = "  ".repeat(Math.max(0, (block.level ?? 1) - 1));
    const bullet = block.listItem === "number" ? "1." : "-";
    return `${indent}${bullet} ${text}`;
  }

  if (block.style === "blockquote") return `> ${text}`;

  const heading = HEADING_PREFIX[block.style ?? "normal"];
  if (heading) return `${heading} ${text}`;

  return text;
}

export function portableTextToMarkdown(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";

  const rendered = (blocks as Block[])
    .map(renderBlock)
    .filter((line): line is string => line !== null);

  // Consecutive list items belong to one list, so they get a single newline
  // between them; everything else gets a blank line.
  return rendered
    .reduce<string[]>((out, line, index) => {
      const previous = rendered[index - 1];
      const bothListItems =
        previous !== undefined &&
        /^\s*(-|\d+\.) /.test(previous) &&
        /^\s*(-|\d+\.) /.test(line);
      out.push(bothListItems ? `\n${line}` : `\n\n${line}`);
      return out;
    }, [])
    .join("")
    .trim();
}
