// components/mdx.tsx
import React from 'react'
import Link from 'next/link'
import Image, { type ImageProps } from 'next/image'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'

/* ============================== Helpers ============================== */

function extractText(node: React.ReactNode): string {
    if (node == null || typeof node === 'boolean') return ''
    if (typeof node === 'string' || typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(extractText).join('')
    if (React.isValidElement(node)) {
        // Narrow to an element with optional children
        const el = node as React.ReactElement<{ children?: React.ReactNode }>
        return extractText(el.props?.children)
    }
    return ''
}

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
}

/* ============================== Table ================================ */

export type TableData = {
    headers: React.ReactNode[]
    rows: React.ReactNode[][]
}

function Table({ data }: { data: TableData }) {
    return (
        <table className="w-full border-collapse">
            <thead>
            <tr>
                {data.headers.map((header, i) => {
                    const key = `${i}-${extractText(header)}`
                    return (
                        <th key={key} className="border-b px-3 py-2 text-left font-medium">
                            {header}
                        </th>
                    )
                })}
            </tr>
            </thead>
            <tbody>
            {data.rows.map((row, r) => {
                const rowKey = `r-${r}-${row.length}`
                return (
                    <tr key={rowKey} className="odd:bg-neutral-50 dark:odd:bg-neutral-900/30">
                        {row.map((cell, c) => {
                            const cellKey = `c-${r}-${c}-${extractText(cell)}`
                            return (
                                <td key={cellKey} className="border-b px-3 py-2 align-top">
                                    {cell}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

/* ============================== Links ================================ */

type AnchorProps = Omit<React.ComponentProps<'a'>, 'href'> & { href: string }

function CustomLink(props: AnchorProps) {
    const { href, children, className, ...rest } = props

    if (href?.startsWith('/')) {
        return (
            <Link href={href} className={className} {...rest}>
                {children}
            </Link>
        )
    }

    if (href?.startsWith('#')) {
        return (
            <a href={href} className={className} {...rest}>
                {children}
            </a>
        )
    }

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
            {children}
        </a>
    )
}

/* ============================== Images =============================== */

function RoundedImage(props: ImageProps) {
    const { alt, className = '', ...rest } = props
    return <Image alt={alt} className={`rounded-lg ${className}`} {...rest} />
}

/* ============================== Code ================================= */

// Inline code
function InlineCode({ children, ...props }: React.ComponentProps<'code'> & { children?: React.ReactNode }) {
    const raw = extractText(children)
    const codeHTML = highlight(raw ?? '')
    return <code {...props} dangerouslySetInnerHTML={{ __html: codeHTML }} />
}

// Fenced blocks (<pre><code>…</code></pre>)
function Pre(props: React.ComponentProps<'pre'> & { children?: React.ReactNode }) {
    // Children.only expects exactly one child; guard to avoid runtime error.
    const child = React.Children.toArray(props.children)[0]
    let inner: React.ReactNode = ''

    if (React.isValidElement(child)) {
        const el = child as React.ReactElement<{ children?: React.ReactNode }>
        inner = el.props?.children
    } else {
        inner = child
    }

    const raw = Array.isArray(inner) ? inner.map(extractText).join('') : extractText(inner ?? '')
    const html = highlight(raw)

    return (
        <pre className="overflow-x-auto rounded-lg p-4 bg-neutral-100 dark:bg-neutral-900 text-sm">
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
    )
}

/* ======================= Auto-link Headings =========================== */

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    const Heading = ({ children }: { children?: React.ReactNode }) => {
        const text = extractText(children)
        const id = slugify(text)
        return React.createElement(
            `h${level}`,
            { id, className: 'group scroll-mt-24' },
            [
                React.createElement('a', {
                    href: `#${id}`,
                    key: `anchor-${id}`,
                    className: 'anchor mr-2 inline-block opacity-0 group-hover:opacity-100 no-underline',
                    'aria-label': `Link to ${text}`,
                }),
                children,
            ],
        )
    }
    Heading.displayName = `Heading${level}`
    return Heading
}

/* =========================== MDX Map ================================= */

const baseComponents = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    a: CustomLink,
    Image: RoundedImage, // use <Image /> in MDX with width/height or fill
    code: InlineCode,    // inline code
    pre: Pre,            // fenced code blocks
    Table,
}

/* ========================== Export Wrapper ============================ */

export function CustomMDX(props: MDXRemoteProps) {
    const components = { ...baseComponents, ...(props.components ?? {}) }
    return <MDXRemote {...props} components={components} />
}

export default CustomMDX
