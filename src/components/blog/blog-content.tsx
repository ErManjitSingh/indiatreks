"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function BlogContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children, ...props }) => {
          const id = String(children)
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
          return (
            <h2 id={id} className="mt-10 scroll-mt-24 font-heading text-2xl font-semibold text-foreground" {...props}>
              {children}
            </h2>
          );
        },
        h3: ({ children, ...props }) => (
          <h3 className="mt-6 font-heading text-xl font-semibold text-foreground" {...props}>
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p className="mt-4 text-base leading-7 text-muted-foreground" {...props}>
            {children}
          </p>
        ),
        ul: ({ children, ...props }) => (
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="leading-7" {...props}>
            {children}
          </li>
        ),
        table: ({ children, ...props }) => (
          <div className="mt-4 overflow-x-auto rounded-xl border border-border/70">
            <table className="min-w-full text-sm" {...props}>
              {children}
            </table>
          </div>
        ),
        th: ({ children, ...props }) => (
          <th className="border-b border-border/70 bg-muted/40 px-3 py-2 text-left font-semibold" {...props}>
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="border-b border-border/50 px-3 py-2 align-top text-muted-foreground" {...props}>
            {children}
          </td>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="mt-4 rounded-xl border-l-4 border-primary/60 bg-primary/5 px-4 py-3 text-sm text-foreground"
            {...props}
          >
            {children}
          </blockquote>
        ),
        a: ({ children, href, ...props }) => (
          <a href={href} className="font-medium text-primary underline-offset-2 hover:underline" {...props}>
            {children}
          </a>
        ),
        strong: ({ children, ...props }) => (
          <strong className="font-semibold text-foreground" {...props}>
            {children}
          </strong>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
