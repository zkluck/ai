import { ChatOpenAIAgent } from '@/agents/chatOpenAI';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const agent = new ChatOpenAIAgent();
    const response = await agent.chat(message);

    return NextResponse.json({ content: response });
  } catch (error) {
    console.error('Chat API 错误:', error);
    return NextResponse.json({ error: '处理请求时出错' }, { status: 500 });
  }
}
