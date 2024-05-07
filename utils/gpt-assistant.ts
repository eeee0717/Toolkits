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
  if(!check())
  {
    return
  }
  // console.log('AIchat', propmt, content)
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: propmt },
      { role: 'user', content: content }
    ],
    model: 'gpt-4-turbo',
  })
  // console.log(completion)
  return completion.choices[0].message.content
}
