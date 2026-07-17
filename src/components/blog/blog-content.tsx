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
            <h2
              id={id}
              className="mt-10 scroll-mt-28 font-heading text-[1.65rem] font-bold tracking-tight text-[#122016]"
              {...props}
            >
              {children}
            </h2>
          );
        },
        h3: ({ children, ...props }) => {
          const id = String(children)
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
          return (
            <h3
              id={id}
              className="mt-7 scroll-mt-28 font-heading text-xl font-bold text-[#122016]"
              {...props}
            >
              {children}
            </h3>
          );
        },
        p: ({ children, ...props }) => (
          <p className="mt-4 text-[15px] leading-7 text-[#4F5D4E] md:text-base" {...props}>
            {children}
          </p>
        ),
        ul: ({ children, ...props }) => (
          <ul
            className="mt-4 space-y-2.5 rounded-2xl border border-[#C9DEC6] bg-[#EAF4E8] px-5 py-4 text-[#314034]"
            {...props}
          >
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-[#4F5D4E]" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="relative pl-1 leading-7" {...props}>
            {children}
          </li>
        ),
        table: ({ children, ...props }) => (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-[#E5EBE3] bg-[#F7FAF6]">
            <table className="min-w-full text-sm" {...props}>
              {children}
            </table>
          </div>
        ),
        thead: ({ children, ...props }) => (
          <thead className="bg-[#EAF4E8]" {...props}>
            {children}
          </thead>
        ),
        th: ({ children, ...props }) => (
          <th className="border-b border-[#D8E2D4] px-3 py-3 text-left font-semibold text-[#122016]" {...props}>
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="border-b border-[#EEF2EC] px-3 py-3 align-top text-[#4F5D4E]" {...props}>
            {children}
          </td>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="mt-5 rounded-2xl border border-[#C9DEC6] border-l-4 border-l-[#2D5A27] bg-[#EAF4E8] px-4 py-3 text-sm text-[#1F4A1F]"
            {...props}
          >
            {children}
          </blockquote>
        ),
        a: ({ children, href, ...props }) => (
          <a href={href} className="font-semibold text-[#2D5A27] underline-offset-2 hover:underline" {...props}>
            {children}
          </a>
        ),
        strong: ({ children, ...props }) => (
          <strong className="font-semibold text-[#122016]" {...props}>
            {children}
          </strong>
        ),
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={typeof src === "string" ? src : undefined}
            alt={alt || ""}
            className="mt-5 w-full rounded-2xl border border-[#E5EBE3] object-cover"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
