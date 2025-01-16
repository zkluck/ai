import { ChatOpenAI } from '@langchain/openai';

export class ChatOpenAIAgent {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      model: 'gpt-4o-mini-2024-07-18',
      configuration: {
        baseURL: process.env.NEXT_PUBLIC_302AI_BASEURL,
      },
    });
  }

  async chat(message: string): Promise<string> {
    try {
      const response = await this.model.invoke(message);

      return typeof response.content === 'string'
        ? response.content
        : Array.isArray(response.content)
        ? response.content
            .map((item) =>
              typeof item === 'string' ? item : JSON.stringify(item)
            )
            .join(' ')
        : JSON.stringify(response.content);
    } catch (error) {
      console.error('ChatOpenAI 调用出错:', error);
      throw error;
    }
  }

  async streamChat(message: string) {
    try {
      const stream = await this.model.stream(message);

      return stream;
    } catch (error) {
      console.error('ChatOpenAI 流式调用出错:', error);
      throw error;
    }
  }
}
