import OpenAI from 'openai'

const openaiBaseUrl = useLocalStorage('openaiBaseUrl', 'https://api.openai.com/v1')
const openaiKey = useLocalStorage('openaiKey', '')
const openai = new OpenAI({
  baseURL:openaiBaseUrl.value,
  apiKey: openaiKey.value,
  dangerouslyAllowBrowser: true,
})
function check()
{
  if(openaiKey.value == '')
  {
    alert('Please enter your OpenAI API key in the settings')
    return false
  }
  return true
}

export async function AIchat(propmt: string, content: string) {
  const model = useLocalStorage('selectedModel', '')
  // console.log(model.value)
  if(!check() || model.value === '')
  {
    return''
  }
  // console.log('AIchat', propmt, content)
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: propmt },
      { role: 'user', content: content }
    ],
    model: model.value,
  })
  // console.log(completion)
  return completion.choices[0].message.content
}

export async function GetModelList(){
  if(!check())
  {
    return[]
  }
  // console.log('models')
  const models = await openai.models.list()
  // console.log(models.data.map((model)=>model.id))
  if(models.data.length == 0) {
    return []
  }
  return models.data.map((model)=>model.id)
}
