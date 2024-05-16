import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event)
  if (data === undefined)
    return
  console.log(data[0]!.filename)
  // const client = await serverSupabaseClient(event)
  // const { data, error } = await client
  //   .storage
  //   .from('toolkits-audio')
  //   .upload(`public/${file.fileName}`, file, {
  //     cacheControl: '3600',
  //     upsert: false,
  //   })
  // console.log(data, error)
})
