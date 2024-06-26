import { serverSupabaseClient } from '#supabase/server'
import type { User } from '~/types/user'

// 查询用户
async function getUser(client: any, id: number, databaseName: string) {
  const { data, error } = await client.from(databaseName).select('vip_token').eq('user_id', id)
  if (error)
    throw error
  if (data === null)
    return null
  return data[0] as User
}

// 更新用户
async function updateUser(client: any, id: number, vipToken: string, databaseName: string) {
  const user: User = { vip_token: vipToken }

  await client.from(databaseName).update(user).eq('user_id', id)
}

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const config = useRuntimeConfig(event)
  const { id, vipToken } = await readBody(event)

  if (vipToken === '') {
    try {
      const user = await getUser(client, id, config.databaseName)
      return user?.vip_token === config.vipToken && config.vipToken !== ''
    }
    catch (error) {
      console.error(error)
      return false
    }
  }
  else if (vipToken !== '' && vipToken === config.vipToken) {
    try {
      await updateUser(client, id, vipToken, config.databaseName)
      return true
    }
    catch (error) {
      console.error(error)
      return false
    }
  }

  return false
})
