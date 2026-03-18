export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function mockChatCompletion(
  messages: ChatMessage[],
): Promise<ChatMessage> {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')
  const userText = lastUser?.content ?? ''

  const replyLines: string[] = [
    '这是来自本地 Mock 的回复（后面会换成真实大模型调用）。',
  ]

  if (userText) {
    replyLines.push(`你刚才说的是：「${userText}」`)
  }

  replyLines.push('当前博客栈：Vue 3 + TypeScript + Element Plus。')

  return {
    role: 'assistant',
    content: replyLines.join('\n'),
  }
}

