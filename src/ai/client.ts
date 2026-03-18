import { mockChatCompletion, type ChatMessage } from './mockClient'

// 火山方舟：Chat Completions 接口（OpenAI 风格），与模型 ID 或推理接入点 ep-xxx 兼容
const ARK_CHAT_ENDPOINT = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions'

// 默认模型 ID（控制台「模型广场」里复制，注意是 2-0 不是 2.0）；也可填推理接入点 ep-xxx
const DEFAULT_MODEL = 'doubao-seed-2-0-pro-260215'

function getModelId(): string {
  const stored = localStorage.getItem('ai_model_id')?.trim()
  return stored || DEFAULT_MODEL
}

export async function chatWithAi(
  messages: ChatMessage[],
): Promise<ChatMessage> {
  const apiKey = localStorage.getItem('ai_api_key')

  if (!apiKey) {
    return mockChatCompletion(messages)
  }

  const model = getModelId()

  try {
    const resp = await fetch(ARK_CHAT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        max_tokens: 2048,
        temperature: 0.7,
      }),
    })

    const rawText = await resp.text()
    let data: any
    try {
      data = rawText ? JSON.parse(rawText) : {}
    } catch {
      data = {}
    }

    if (!resp.ok) {
      const errMsg =
        data?.error?.message ||
        data?.message ||
        rawText ||
        `HTTP ${resp.status}`
      if (resp.status === 404 || errMsg.includes('NotFound') || errMsg.includes('not exist')) {
        return {
          role: 'assistant',
          content: `接口返回 404/NotFound，通常表示当前模型或接入点不可用。请到火山方舟控制台：1）在「开通管理」中开通该模型；2）或在「模型广场」为该模型创建「推理接入点」，把接入点 ID（ep- 开头）填到 AI 设置里的「模型 ID / 接入点」中。当前使用的模型/接入点：${model}。`,
        }
      }
      if (resp.status === 401 || resp.status === 403) {
        return {
          role: 'assistant',
          content: `鉴权失败（${resp.status}），请检查 API Key 是否正确、是否已启用，以及该 Key 是否有权限访问当前模型/接入点。`,
        }
      }
      throw new Error(errMsg)
    }

    const content =
      data?.choices?.[0]?.message?.content ??
      data?.output_text ??
      '豆包返回了空内容，请检查模型与返回结构。'

    return {
      role: 'assistant',
      content: typeof content === 'string' ? content : String(content),
    }
  } catch (error) {
    console.error(error)
    const msg = error instanceof Error ? error.message : String(error)
    return {
      role: 'assistant',
      content: `调用豆包接口失败：${msg}。请检查网络、API Key 与 AI 设置中的模型 ID/接入点（可在控制台复制 ep- 或模型 ID）。`,
    }
  }
}

