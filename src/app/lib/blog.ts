import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  readTime: string
  tags: string[]
  description: string
  featured: boolean
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  readTime: string
  tags: string[]
  description: string
  featured: boolean
}

export function getAllPosts(): BlogPostMeta[] {
  const fileNames = fs.readdirSync(contentDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        readTime: data.readTime || '',
        tags: data.tags || [],
        description: data.description || '',
        featured: data.featured || false,
      }
    })

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(contentDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      readTime: data.readTime || '',
      tags: data.tags || [],
      description: data.description || '',
      featured: data.featured || false,
      content,
    }
  } catch {
    return null
  }
}

