import * as tencentcloud from 'tencentcloud-sdk-nodejs-common'

export function createRecTask(secretId: string, secretKey: string, engineModelType: string, audioUrl: string) {
  const CommonClient = tencentcloud.CommonClient

  const clientConfig = {
    credential: {
      secretId,
      secretKey,
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
    EngineModelType: engineModelType,
    Url: audioUrl,
  }
  client.request('CreateRecTask', params).then(
    (data) => {
      console.log(data)
    },
    (err) => {
      console.error('error', err)
    },
  )
}
