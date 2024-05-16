import * as tencentcloud from 'tencentcloud-sdk-nodejs-common'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const CommonClient = tencentcloud.CommonClient
    const config = useRuntimeConfig(event)
    const clientConfig = {
      credential: {
        secretId: config.tencent.secretId,
        secretKey: config.tencent.secretKey,
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
      EngineModelType: body.engineModelType,
      ChannelNum: 1,
      ResTextFormat: 0,
      SourceType: 0,
      Url: body.audioUrl,
    }

    const data = await client.request('CreateRecTask', params)

    return {
      RequestId: data.RequestId,
      TaskId: data.Data.TaskId,
    }
  }
  catch (err) {
    console.error('error', err)
  }
})
