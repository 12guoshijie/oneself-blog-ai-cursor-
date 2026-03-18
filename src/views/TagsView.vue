<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { posts } from '../content/posts.meta'

const router = useRouter()

const tagCounts = computed(() => {
  const map = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1])
})

function goToTag(tag: string) {
  router.push({ path: '/posts', query: { tag } })
}
</script>

<template>
  <div class="page">
    <h1 class="title">标签</h1>
    <p class="subtitle">共 {{ tagCounts.length }} 个标签，点击查看该标签下的文章。</p>
    <div class="tag-list">
      <el-tag
        v-for="[tag, count] in tagCounts"
        :key="tag"
        class="tag-item"
        size="large"
        effect="plain"
        @click="goToTag(tag)"
      >
        {{ tag }} ({{ count }})
      </el-tag>
    </div>
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
  margin-bottom: 24px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-item {
  cursor: pointer;
}
</style>
