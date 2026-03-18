export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
}

export const posts: PostMeta[] = [
  {
    slug: 'hello-ai-frontend',
    title: 'Hello, AI 赋能前端博客',
    date: '2026-03-16',
    tags: ['前端', 'AI', 'Vue 3'],
    summary: '记录我搭建这个 Vue 3 + Element Plus + 大模型助手个人博客的起点。',
  },
  {
    slug: 'why-personal-blog',
    title: '为什么还要写个人博客？',
    date: '2026-03-16',
    tags: ['杂谈'],
    summary: '简单聊聊我做这个博客的动机，以及之后想尝试的 AI 能力。',
  },
]

