<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const apiKey = ref('')
const modelId = ref('')

watchEffect(() => {
  if (visible.value) {
    apiKey.value = localStorage.getItem('ai_api_key') ?? ''
    modelId.value = localStorage.getItem('ai_model_id') ?? ''
  }
})

const save = () => {
  const key = apiKey.value.trim()
  if (key) localStorage.setItem('ai_api_key', key)
  else localStorage.removeItem('ai_api_key')

  const mid = modelId.value.trim()
  if (mid) localStorage.setItem('ai_model_id', mid)
  else localStorage.removeItem('ai_model_id')

  visible.value = false
}
</script>

<template>
  <el-dialog v-model="visible" title="AI 设置" width="480px">
    <p class="tip">
      豆包（火山方舟）：API Key 与模型 ID 仅保存在本机。未填写 Key 时使用本地 Mock。
    </p>

    <el-form label-width="120px">
      <el-form-item label="API Key">
        <el-input
          v-model="apiKey"
          type="password"
          show-password
          placeholder="火山方舟控制台 → API Key 管理 中复制"
        />
      </el-form-item>
      <el-form-item label="模型 ID / 接入点">
        <el-input
          v-model="modelId"
          placeholder="留空则用默认；或填 ep-xxx / 模型 ID（控制台复制）"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.tip {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-bottom: 12px;
}
</style>

