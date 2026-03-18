<script setup lang="ts">
</script>

<template>
  <div class="page">
    <h1 class="title">关于我</h1>
    <p class="subtitle">一名前端开发者，正在探索如何用大模型提升开发与写作效率。</p>

    <el-card class="block">
      <h2>技术栈</h2>
      <el-tag type="primary" effect="plain">Vue 3</el-tag>
      <el-tag type="success" effect="plain">TypeScript</el-tag>
      <el-tag type="info" effect="plain">Element Plus</el-tag>
      <el-tag type="warning" effect="plain">大模型 API</el-tag>
    </el-card>

    <el-card class="block">
      <h2>这个博客想做什么？</h2>
      <p>记录学习、沉淀知识，同时尝试用 AI 做导航、写作助手和代码助手，让个人博客变得更“聪明”。</p>
    </el-card>
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

.block {
  margin-bottom: 20px;
}

.block h2 {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--el-text-color-primary);
}

.block p {
  margin: 0;
  line-height: 1.6;
  color: var(--el-text-color-regular);
}
</style>

