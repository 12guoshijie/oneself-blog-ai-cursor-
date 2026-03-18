<script setup lang="ts">
</script>

<template>
  <section class="comment-section">
    <h3 class="comment-title">评论</h3>
    <el-empty description="评论功能预留，可后续接入 Giscus、Twikoo 等" />
  </section>
</template>

<style scoped>
.comment-section {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--el-border-color-light);
}

.comment-title {
  font-size: 18px;
  margin-bottom: 16px;
}
</style>
