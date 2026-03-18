<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="page home-page">
    <h1 class="title">欢迎</h1>
    <p class="subtitle">
      这里会记录前端学习与工作心得，以及 AI 赋能前端的实践。欢迎逛逛文章、标签与归档。
    </p>
    <div class="quick-links">
      <el-button type="primary" plain @click="router.push('/posts')">文章</el-button>
      <el-button type="success" plain @click="router.push('/tags')">标签</el-button>
      <el-button type="info" plain @click="router.push('/archive')">归档</el-button>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
}

.home-page .title {
  font-size: 28px;
  margin-bottom: 12px;
}

.subtitle {
  color: var(--el-text-color-secondary);
  margin-bottom: 24px;
  line-height: 1.6;
}

.quick-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>

