import OpenAI from 'openai'

export interface AIService {
  name: string
  apiUrl: string
  apiKey: string
  selectedModel: string
  models: string[]
  checked: boolean
}

export class AI {
  private openai: OpenAI
  constructor(apiUrl: string, apiKey: string) {
    this.openai = new OpenAI({
      baseURL: apiUrl,
      apiKey,
      dangerouslyAllowBrowser: true,
    })
  }

  async getModels() {
    const models = await this.openai.models.list()
    return models.data.map(model => model.id)
  }

  async getCompletions(model: string, prompt: string, content: string) {
    const completion = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content },
      ],
      model,
    })
    return completion.choices[0].message.content
  }
}
