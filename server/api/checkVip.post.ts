export default defineEventHandler(async (event) => {
  // 获取用户id
  const id = await readBody(event)
  console.log(id)
  const config = useRuntimeConfig(event)
  // 通过id查询supabase数据库
  console.log(config.databaseUrl)
  // 返回是否为vip
})
