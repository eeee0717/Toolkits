import OpenAI from 'openai'

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
}

// export function AI(apiUrl: string, apiKey: string): OpenAI {
//   return new OpenAI({
//     baseURL: apiUrl,
//     apiKey,
//     dangerouslyAllowBrowser: true,
//   })
// }

// export async function GetModelList(openai: OpenAI) {
//   console.log('models')
//   const models = await openai.models.list()
//   return models.data.map(model => model.id)
// }
