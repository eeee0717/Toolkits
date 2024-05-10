import * as tencentcloud from 'tencentcloud-sdk-nodejs-common'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const CommonClient = tencentcloud.CommonClient

    const clientConfig = {
      credential: {
        secretId: body.secretId,
        secretKey: body.secretKey,
      },
      region: '',
      profile: {
        httpProfile: {
          endpoint: 'asr.tencentcloudapi.com',
        },
      },
    }

    const client = new CommonClient(
      'asr.tencentcloudapi.com',
      '2019-06-14',
      clientConfig,
    )

    const params = {
      TaskId: BigInt(body.taskId),
    }

    const data = await client.request('DescribeTaskStatus', params)

    return {
      TaskId: data.Data.TaskId,
      Status: data.Data.StatusStr,
      Result: data.Data.Result,
    }
  }
  catch (err) {
    console.error('error', err)
  }
})
