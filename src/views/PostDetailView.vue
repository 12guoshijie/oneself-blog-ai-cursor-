<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import AiSummaryPanel from '../components/AiSummaryPanel.vue'
import CommentSection from '../components/CommentSection.vue'
import type { PostMeta } from '../content/posts.meta'
import { posts } from '../content/posts.meta'

const route = useRoute()

const post = ref<PostMeta | undefined>()
const html = ref<string>('')
const loading = ref(false)
const error = ref<string | null>(null)

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  highlight(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        )
      } catch {
        // ignore
      }
    }
    return (
      '<pre class="hljs"><code>' +
      str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') +
      '</code></pre>'
    )
  },
})

async function loadContent() {
  const slug = route.params.slug as string
  post.value = posts.find((p) => p.slug === slug)
  error.value = null

  if (!post.value) {
    error.value = '没有找到这篇文章。'
    return
  }

  try {
    loading.value = true
    const markdownModule = await import(`../content/posts/${slug}.md?raw`)
    html.value = md.render(markdownModule.default)
  } catch (e) {
    console.error(e)
    error.value = '加载文章内容时出错。'
  } finally {
    loading.value = false
  }
}

onMounted(loadContent)
</script>

<template>
  <div class="page">
    <template v-if="post">
      <h1 class="title">{{ post.title }}</h1>
      <p class="subtitle">
        {{ post.date }}
        <span class="tags">
          <el-tag
            v-for="tag in post.tags"
            :key="tag"
            size="small"
            effect="plain"
            class="tag"
          >
            {{ tag }}
          </el-tag>
        </span>
      </p>

      <el-skeleton v-if="loading" animated :rows="6" />
      <el-alert v-else-if="error" type="error" :title="error" show-icon>
        <el-button type="primary" size="small" @click="loadContent">重试</el-button>
      </el-alert>

      <template v-else>
        <div class="markdown-body" v-html="html" />
        <AiSummaryPanel :title="post.title" :summary="post.summary" />
        <CommentSection />
      </template>
    </template>

    <el-alert v-else type="warning" title="正在查找文章元信息…" show-icon />
  </div>
</template>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--el-text-color-secondary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.tags {
  margin-left: 12px;
}

.tag {
  margin-right: 4px;
}

.markdown-body {
  font-size: 15px;
  line-height: 1.8;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  margin-top: 20px;
  margin-bottom: 12px;
}

.markdown-body p {
  margin: 8px 0;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 24px;
  margin: 8px 0;
}

.markdown-body pre {
  padding: 12px 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
}

.markdown-body pre code {
  font-size: 13px;
  line-height: 1.5;
}
</style>

