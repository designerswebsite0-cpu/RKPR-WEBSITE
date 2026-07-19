"use client";

import ReactMarkdown, { type Components } from "react-markdown";

interface Props {
  text: string;
}

const SAFE_URL_PATTERN = /^(https?:)?\/\//i;

const components: Components = {
  // Chat bubbles are compact — browser-default block spacing (large
  // heading sizes, paragraph margins) reads as broken here, not as
  // formatting. Everything collapses to the same inline text size as a
  // plain reply, with just enough spacing to separate distinct lines.
  p: ({ children }) => <p className="whitespace-pre-wrap break-words">{children}</p>,
  h1: ({ children }) => <p className="font-semibold">{children}</p>,
  h2: ({ children }) => <p className="font-semibold">{children}</p>,
  h3: ({ children }) => <p className="font-semibold">{children}</p>,
  ul: ({ children }) => <ul className="my-1 list-disc pl-4">{children}</ul>,
  ol: ({ children }) => <ol className="my-1 list-decimal pl-4">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => {
    if (!href || !SAFE_URL_PATTERN.test(href)) return <>{children}</>;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
        {children}
      </a>
    );
  },
  code: ({ children }) => (
    <code className="rounded bg-charcoal/10 px-1 py-0.5 font-mono text-[0.85em]">{children}</code>
  ),
};

export default function MarkdownText({ text }: Props) {
  return (
    <div className="whitespace-pre-wrap break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <ReactMarkdown components={components}>{text}</ReactMarkdown>
    </div>
  );
}
