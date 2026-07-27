import { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArchitectureDiagram from './ArchitectureDiagram';
import Figure from './Figure';
import TerminalBlock from './TerminalBlock';

/** Collapses a React child tree down to its plain text, for fenced code blocks. */
function toText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(toText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return toText(node.props.children);
  return '';
}

/**
 * Renders post markdown. Body type is set here rather than on the route so the
 * measure (~68ch) and the prose scale travel together with the component map.
 */
export default function PostBody({ content }: { content: string }) {
  return (
    <div className="max-w-[68ch] text-[17px] leading-[1.7] text-text-secondary transition-colors duration-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-14 mb-4 border-t border-border pt-8 text-[19px] font-semibold leading-snug text-text-primary">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-9 mb-3 text-[16px] font-semibold text-text-primary">{children}</h3>
          ),
          p: ({ children }) => {
            // A lone image becomes a <figure>, which cannot legally nest in a <p>.
            const only = Children.toArray(children).filter(
              (c) => !(typeof c === 'string' && c.trim() === '')
            );
            if (
              only.length === 1 &&
              isValidElement<{ src?: string }>(only[0]) &&
              only[0].type === Figure
            ) {
              return <>{only[0]}</>;
            }
            return <p className="mb-6">{children}</p>;
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-text-primary underline decoration-border-hover underline-offset-4 transition-colors duration-150 hover:decoration-text-primary"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-text-primary">{children}</strong>
          ),
          ul: ({ children }) => <ul className="mb-6 space-y-2 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-5">{children}</ol>,
          li: ({ children }) => (
            <li className="relative marker:text-text-faint before:absolute before:-left-5 before:text-text-faint">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-2 border-border-hover pl-5 text-text-primary">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-12 border-border" />,
          img: ({ src, alt }) =>
            typeof src === 'string' ? <Figure src={src} alt={alt ?? ''} /> : null,
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto">
              <table className="w-full border-collapse text-[14px]">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-border-hover">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-text-muted">
              {children}
            </th>
          ),
          tr: ({ children }) => <tr className="border-b border-border">{children}</tr>,
          td: ({ children }) => (
            <td className="px-3 py-2.5 font-mono text-[13px] text-text-secondary">{children}</td>
          ),
          code: ({ className, children }) => {
            // Inline code only; fenced blocks are intercepted by `pre` below.
            if (className) return <>{children}</>;
            return (
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px] text-text-primary">
                {children}
              </code>
            );
          },
          pre: ({ children }) => {
            const child = Children.toArray(children)[0];
            const lang =
              isValidElement<{ className?: string }>(child) &&
              typeof child.props.className === 'string'
                ? child.props.className.replace('language-', '')
                : '';
            if (lang === 'diagram') return <ArchitectureDiagram />;
            const text = toText(children).replace(/\n$/, '');
            return <TerminalBlock title={lang === 'console' ? undefined : lang}>{text}</TerminalBlock>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
