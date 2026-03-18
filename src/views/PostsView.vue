<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { posts } from '../content/posts.meta'

const route = useRoute()
const router = useRouter()

const tagFilter = computed(() => (route.query.tag as string) || '')
const searchQuery = computed(() => (route.query.q as string) || '')

const filteredPosts = computed(() => {
  let list = posts
  if (tagFilter.value) {
    list = list.filter((p) => p.tags.includes(tagFilter.value))
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q),
    )
  }
  return list
})

const goDetail = (slug: string) => {
  router.push(`/posts/${slug}`)
}
</script>

<template>
  <div class="page">
    <h1 class="title">文章列表</h1>
    <p class="subtitle">
      <template v-if="tagFilter || searchQuery">
        当前筛选：
        <el-tag v-if="tagFilter" size="small" class="filter-tag">{{ tagFilter }}</el-tag>
        <template v-if="searchQuery">「{{ searchQuery }}」</template>
        ，共 {{ filteredPosts.length }} 篇。
      </template>
      <template v-else>从本地 Markdown 读取的文章元数据。</template>
    </p>

    <el-row v-if="filteredPosts.length" :gutter="16">
      <el-col
        v-for="post in filteredPosts"
        :key="post.slug"
        :xs="24"
        :sm="12"
        :md="12"
        :lg="8"
        class="post-col"
      >
        <el-card class="post-card" shadow="hover" @click="goDetail(post.slug)">
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-meta">{{ post.date }}</p>
          <p class="post-summary">{{ post.summary }}</p>
          <div class="post-tags">
            <el-tag
              v-for="tag in post.tags"
              :key="tag"
              size="small"
              effect="plain"
              class="tag"
            >
              {{ tag }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-empty v-else description="没有符合条件的文章" />
  </div>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--el-text-color-secondary);
  margin-bottom: 24px;
}

.post-col {
  margin-bottom: 16px;
}

.post-card {
  cursor: pointer;
}

.post-title {
  font-size: 18px;
  margin-bottom: 4px;
}

.post-meta {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-bottom: 8px;
}

.post-summary {
  font-size: 14px;
  margin-bottom: 8px;
}

.post-tags .tag {
  margin-right: 4px;
}

.filter-tag {
  margin-right: 4px;
}
</style>

