import { serverSupabaseClient } from '#supabase/server'
import type { User } from '~/types/user'

export default defineEventHandler(async (event) => {
  // 获取用户id
  const body = await readBody(event)

  const client = await serverSupabaseClient(event)
  const user: User = {
    user_id: body.id,
  }
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const { data, error } = await client.from('users').insert([user]).select()
  // eslint-disable-next-line no-console
  console.log(data, error)
})
