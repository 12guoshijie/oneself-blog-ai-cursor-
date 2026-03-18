<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { posts } from '../content/posts.meta'

const router = useRouter()

const grouped = computed(() => {
  const map = new Map<string, typeof posts>()
  for (const post of posts) {
    const key = post.date.slice(0, 7)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(post)
  }
  return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]))
})

function goToPost(slug: string) {
  router.push(`/posts/${slug}`)
}
</script>

<template>
  <div class="page">
    <h1 class="title">归档</h1>
    <p class="subtitle">按年月整理的文章列表。</p>

    <el-timeline>
      <el-timeline-item
        v-for="[yearMonth, list] in grouped"
        :key="yearMonth"
        :timestamp="yearMonth"
        placement="top"
      >
        <ul class="archive-list">
          <li
            v-for="post in list"
            :key="post.slug"
            class="archive-item"
            @click="goToPost(post.slug)"
          >
            <span class="date">{{ post.date }}</span>
            <span class="title-link">{{ post.title }}</span>
          </li>
        </ul>
      </el-timeline-item>
    </el-timeline>
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

.archive-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.archive-item {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 6px 0;
  cursor: pointer;
}

.archive-item .date {
  flex-shrink: 0;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.archive-item .title-link {
  flex: 1;
}

.archive-item:hover .title-link {
  color: var(--el-color-primary);
}
</style>
