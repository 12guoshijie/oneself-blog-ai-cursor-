<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  summary?: string
  rawText?: string
}>()

const summary = ref('')
const askAnswer = ref('')
const loadingSummary = ref(false)
const loadingAsk = ref(false)
const askInput = ref('')

async function fetchSummary() {
  if (!props.rawText && !props.summary) return
  loadingSummary.value = true
  summary.value = ''
  try {
    await new Promise((r) => setTimeout(r, 600))
    summary.value =
      props.summary ||
      `【Mock 摘要】本文《${props.title}》的简要概括。后续将接入真实大模型生成摘要。`
  } finally {
    loadingSummary.value = false
  }
}

async function askAboutArticle() {
  if (!askInput.value.trim()) return
  loadingAsk.value = true
  askAnswer.value = ''
  try {
    await new Promise((r) => setTimeout(r, 500))
    askAnswer.value = `【Mock 回复】关于「${askInput.value}」：本文《${props.title}》与此相关。后续将结合文章内容调用大模型回答。`
  } finally {
    loadingAsk.value = false
  }
}
</script>

<template>
  <el-card class="ai-summary-panel" shadow="never">
    <template #header>
      <span>AI 助手</span>
    </template>

    <div class="block">
      <div class="block-label">文章摘要</div>
      <el-button
        v-if="!summary && !loadingSummary"
        type="primary"
        text
        size="small"
        @click="fetchSummary"
      >
        生成摘要
      </el-button>
      <el-skeleton v-if="loadingSummary" :rows="2" animated />
      <p v-else-if="summary" class="summary-text">{{ summary }}</p>
    </div>

    <el-divider />

    <div class="block">
      <div class="block-label">针对这篇文章提问</div>
      <el-input
        v-model="askInput"
        type="textarea"
        :rows="2"
        placeholder="输入问题，例如：这篇文章的核心观点是什么？"
      />
      <el-button
        type="primary"
        size="small"
        class="ask-btn"
        :loading="loadingAsk"
        @click="askAboutArticle"
      >
        提问
      </el-button>
      <p v-if="askAnswer" class="answer-text">{{ askAnswer }}</p>
    </div>
  </el-card>
</template>

<style scoped>
.ai-summary-panel {
  margin-top: 24px;
}

.block {
  margin-bottom: 12px;
}

.block-label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-bottom: 8px;
}

.summary-text,
.answer-text {
  font-size: 14px;
  line-height: 1.6;
  margin: 8px 0 0;
}

.ask-btn {
  margin-top: 8px;
}
</style>
