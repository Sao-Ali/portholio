import { getBlogPosts } from '@/app/blog/utils'
import { projects } from '@/lib/portfolio-data'

// TODO: replace with the production portfolio domain when it is available.
export const baseUrl = 'https://sao-ali.github.io/portholio'

export default async function sitemap() {
    const blogs = getBlogPosts().map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.metadata.publishedAt,
    }))

    const routes = ['', '/about', '/now', '/projects', '/blog'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }))

    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
    }))

    return [...routes, ...projectRoutes, ...blogs]
}
