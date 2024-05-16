import { serverSupabaseClient } from '#supabase/server'
import type { User } from '~/types/user'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    // 获取用户id
    const body = await readBody(event)

    const client = await serverSupabaseClient(event)
    const user: User = {
      user_id: body.id,
    }
    const { data: userData, error: userError } = await client.from(config.databaseName).select().eq('user_id', body.id)
    if (userError)
      throw userError

    if (userData?.length !== 0)
      return

    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const { data, error } = await client.from(config.databaseName).insert(user).select()
    if (error)
      throw error

    // eslint-disable-next-line no-console
    console.log(data)
  }
  catch (error) {
    console.error('An error occurred:', error)
  }
})
