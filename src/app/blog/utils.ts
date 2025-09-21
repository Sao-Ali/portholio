import fs from 'fs'
import path from 'path'


export type Metadata = {
    title: string
    publishedAt: string // ISO or YYYY-MM-DD
    summary: string
    image?: string
}

export type PostRecord = {
    metadata: Metadata
    slug: string
    content: string
}

function parseFrontmatter(fileContent: string): { metadata: Partial<Metadata>; content: string } {
    const fm = /^---\s*\n([\s\S]*?)\n---\s*\n?/
    const match = fileContent.match(fm)

    if (!match) {
        return { metadata: {}, content: fileContent.trim() }
    }

    const frontMatterBlock = match[1]
    const content = fileContent.slice(match[0].length).trim()
    const metadata: Record<string, string> = {}

    for (const rawLine of frontMatterBlock.split('\n')) {
        const line = rawLine.trim()
        if (!line || line.startsWith('#')) continue
        const idx = line.indexOf(':')
        if (idx === -1) continue
        const key = line.slice(0, idx).trim()
        let value = line.slice(idx + 1).trim()
        value = value.replace(/^['"](.*)['"]$/, '$1')
        metadata[key] = value
    }

    return { metadata, content }
}

function getMDXFiles(dir: string): string[] {
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir).filter((file) => path.extname(file).toLowerCase() === '.mdx')
}

function readMDXFile(filePath: string): { metadata: Partial<Metadata>; content: string } {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return parseFrontmatter(raw)
}

function getMDXData(dir: string): PostRecord[] {
    const files = getMDXFiles(dir)
    return files.map((file) => {
        const abs = path.join(dir, file)
        const { metadata, content } = readMDXFile(abs)
        const slug = path.basename(file, path.extname(file))

        const md = {
            title: String(metadata.title ?? slug),
            publishedAt: String(metadata.publishedAt ?? new Date().toISOString().slice(0, 10)),
            summary: String(metadata.summary ?? ''),
            image: metadata.image ? String(metadata.image) : undefined,
        } satisfies Metadata

        return { metadata: md, slug, content }
    })
}

export function getBlogPosts(): PostRecord[] {
    const root = process.cwd()

    // Works for both structures:
    // - ./src/app/blog/posts
    // - ./app/blog/posts
    const appDir = fs.existsSync(path.join(root, 'src', 'app'))
        ? path.join(root, 'src', 'app')
        : path.join(root, 'app')

    const postsDir = path.join(appDir, 'blog', 'posts')

    if (!fs.existsSync(postsDir)) {
        return []
    }

    return getMDXData(postsDir)
}


export function formatDate(dateInput: string, includeRelative = false): string {
    // Normalize (support YYYY-MM-DD)
    const iso = dateInput.includes('T') ? dateInput : `${dateInput}T00:00:00`
    const date = new Date(iso)
    const full = date.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })

    if (!includeRelative) return full

    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

    // Choose largest sensible unit
    const minutes = Math.round(diffMs / 60000)
    const hours = Math.round(diffMs / 3600000)
    const days = Math.round(diffMs / 86400000)
    const months = Math.round(diffMs / (86400000 * 30))
    const years = Math.round(diffMs / (86400000 * 365))

    let rel: string
    if (Math.abs(years) >= 1) rel = rtf.format(years, 'year')
    else if (Math.abs(months) >= 1) rel = rtf.format(months, 'month')
    else if (Math.abs(days) >= 1) rel = rtf.format(days, 'day')
    else if (Math.abs(hours) >= 1) rel = rtf.format(hours, 'hour')
    else rel = rtf.format(minutes, 'minute')

    return `${full} (${rel})`
}
