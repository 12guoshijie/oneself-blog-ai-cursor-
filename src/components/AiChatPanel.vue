<script setup lang="ts">
import { computed, ref } from 'vue'
import { chatWithAi } from '../ai/client'
import type { ChatMessage } from '../ai/mockClient'
import { renderMarkdown } from '../utils/markdown'

const visible = ref(false)
const input = ref('')
const loading = ref(false)
const hasApiKey = computed(() => !!localStorage.getItem('ai_api_key'))
const chatTitle = computed(() =>
  hasApiKey.value ? 'AI 聊天助手' : 'AI 聊天助手（未配置 Key）',
)
const messages = ref<ChatMessage[]>([
  {
    role: 'assistant',
    content:
      '你好，我是这个博客的 AI 小助手。你可以问我技术问题、让我帮你找文章，或随便聊聊。在「AI 设置」中配置 API Key 后即可使用豆包大模型。',
  },
])

const toggle = () => {
  visible.value = !visible.value
}

const send = async () => {
  if (!input.value.trim() || loading.value) return

  const userMsg: ChatMessage = { role: 'user', content: input.value.trim() }
  messages.value.push(userMsg)
  input.value = ''

  loading.value = true
  try {
    const reply = await chatWithAi(messages.value)
    messages.value.push(reply)
  } finally {
    loading.value = false
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    send()
  }
}
</script>

<template>
  <div class="ai-chat-root">
    <el-button
      class="fab"
      type="primary"
      circle
      size="large"
      @click="toggle"
    >
      AI
    </el-button>

    <el-drawer
      v-model="visible"
      direction="rtl"
      size="360px"
      :title="chatTitle"
    >
      <div class="messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['bubble', msg.role]"
        >
          <div class="bubble-inner">
            <div
              class="bubble-text markdown-body"
              v-html="renderMarkdown(msg.content)"
            />
          </div>
        </div>
        <div v-if="loading" class="loading">思考中…</div>
      </div>

      <div class="input-area">
        <el-input
          v-model="input"
          type="textarea"
          rows="2"
          resize="none"
          @keydown="handleKeydown"
          placeholder="说点什么，比如：帮我规划一下前端学习路线"
        />
        <el-button
          type="primary"
          class="send-btn"
          :loading="loading"
          @click="send"
        >
          发送
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped>
.ai-chat-root {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 2000;
}

.fab {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.messages {
  height: calc(100% - 140px);
  overflow-y: auto;
  padding-right: 4px;
}

.bubble {
  display: flex;
  margin-bottom: 8px;
}

.bubble.user {
  justify-content: flex-end;
}

.bubble.assistant {
  justify-content: flex-start;
}

.bubble-inner {
  max-width: 260px;
  border-radius: 8px;
  padding: 8px 10px;
  background: var(--el-fill-color-light);
  font-size: 13px;
}

.bubble-text {
  margin: 0;
  line-height: 1.6;
  word-break: break-word;
}

.bubble-text :deep(p) {
  margin: 0 0 0.5em;
}

.bubble-text :deep(p:last-child) {
  margin-bottom: 0;
}

.bubble-text :deep(ul),
.bubble-text :deep(ol) {
  margin: 0.25em 0;
  padding-left: 1.2em;
}

.bubble-text :deep(code) {
  font-size: 0.9em;
  padding: 0.1em 0.3em;
  border-radius: 4px;
  background: var(--el-fill-color);
}

.bubble-text :deep(pre) {
  margin: 0.5em 0;
  padding: 8px;
  border-radius: 6px;
  overflow-x: auto;
  background: var(--el-fill-color);
}

.bubble-text :deep(pre code) {
  padding: 0;
  background: none;
}

.bubble.user .bubble-inner {
  background: var(--el-color-primary-light-7);
}

.loading {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 4px;
}

.input-area {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 8px 16px 16px;
  box-sizing: border-box;
  border-top: 1px solid var(--el-border-color-light);
}

.send-btn {
  margin-top: 6px;
  width: 100%;
}
</style>

