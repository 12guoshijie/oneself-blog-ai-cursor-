<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { chatWithAi } from '../ai/client'
import { renderMarkdown } from '../utils/markdown'

const mode = ref<'outline' | 'polish'>('outline')
const topic = ref('')
const draft = ref('')
const result = ref('')
const loading = ref(false)

async function generateOutline() {
  if (!topic.value.trim()) return
  loading.value = true
  result.value = ''
  try {
    const reply = await chatWithAi([
      {
        role: 'user',
        content: `请根据以下主题生成一篇技术博客文章的大纲，用简洁的列表形式（如 1. 2. 3. 或 - 条目），每一条占一行，不要多余解释。\n\n主题：${topic.value.trim()}`,
      },
    ])
    result.value = reply.content
  } catch (e) {
    console.error(e)
    result.value = '生成失败，请检查 AI 设置与网络后重试。'
  } finally {
    loading.value = false
  }
}

async function polishDraft() {
  if (!draft.value.trim()) return
  loading.value = true
  result.value = ''
  try {
    const reply = await chatWithAi([
      {
        role: 'user',
        content: `请将以下草稿润色，保持原意，使表达更流畅、专业。只输出润色后的正文，不要额外解释或加「润色结果」等前缀。\n\n草稿：\n${draft.value.trim()}`,
      },
    ])
    result.value = reply.content
  } catch (e) {
    console.error(e)
    result.value = '润色失败，请检查 AI 设置与网络后重试。'
  } finally {
    loading.value = false
  }
}

const resultHtml = computed(() => renderMarkdown(result.value))

function copyResult() {
  if (!result.value) return
  navigator.clipboard.writeText(result.value).then(
    () => ElMessage.success('已复制到剪贴板'),
    () => ElMessage.error('复制失败'),
  )
}
</script>

<template>
  <div class="page">
    <h1 class="title">AI 实验室</h1>
    <p class="subtitle">写作助手：根据主题生成文章大纲，或润色一段草稿。</p>

    <el-tabs v-model="mode" class="lab-tabs">
      <el-tab-pane label="生成大纲" name="outline">
        <el-input
          v-model="topic"
          type="textarea"
          :rows="2"
          placeholder="输入文章主题，例如：Vue3 组合式 API 入门"
        />
        <el-button
          type="primary"
          class="action-btn"
          :loading="loading"
          @click="generateOutline"
        >
          生成大纲
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="润色草稿" name="polish">
        <el-input
          v-model="draft"
          type="textarea"
          :rows="5"
          placeholder="粘贴需要润色的段落"
        />
        <el-button
          type="primary"
          class="action-btn"
          :loading="loading"
          @click="polishDraft"
        >
          润色
        </el-button>
      </el-tab-pane>
    </el-tabs>

    <el-card v-if="result" class="result-card" shadow="never">
      <template #header>
        <span>结果</span>
        <el-button type="primary" text size="small" class="copy-btn" @click="copyResult">
          复制
        </el-button>
      </template>
      <div class="result-text markdown-body" v-html="resultHtml" />
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

.lab-tabs {
  margin-bottom: 16px;
}

.action-btn {
  margin-top: 12px;
}

.result-card {
  margin-top: 24px;
}

.result-card :deep(.el-card__header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.copy-btn {
  margin-left: auto;
}

.result-text {
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
}

.result-text :deep(p) {
  margin: 0 0 0.5em;
}

.result-text :deep(ul),
.result-text :deep(ol) {
  margin: 0.25em 0;
  padding-left: 1.2em;
}

.result-text :deep(code) {
  font-size: 0.9em;
  padding: 0.1em 0.3em;
  border-radius: 4px;
  background: var(--el-fill-color);
}

.result-text :deep(pre) {
  margin: 0.5em 0;
  padding: 8px;
  border-radius: 6px;
  overflow-x: auto;
  background: var(--el-fill-color);
}

.result-text :deep(pre code) {
  padding: 0;
  background: none;
}
</style>
