<script setup lang="ts">
import { saveAs } from 'file-saver'
import { v1 as uuid } from 'uuid'

const items = [{
  key: 'CreateRecTask',
  label: '录音文字识别请求',
  description: '创建录音转文字请求',
}, {
  key: 'DescribeTaskStatus',
  label: '识别结果查询',
  description: '查询录音转文字任务的处理状态',
}]
const user = await useSupabaseUser()
const config = await useRuntimeConfig()
const client = await useSupabaseClient()
const isVip = ref(false)
const engineModelType = ref<string>('16k_zh')
const audioUrl = ref<string>('')
const vipToken = ref('')
const taskId = ref<string>('')
const taskStatus = ref<string>('')
const taskResult = ref<string>('')
const toast = useToast()
const fileName = ref<string>('')
// https://github.com/nuxt/ui/issues/1727
async function fileUpload(event: any) {
  try {
    const file = event[0]
    fileName.value = file.name
    const fileExt = file.name.split('.').pop()
    const filePath = `${uuid()}.${fileExt}`
    toast.add({ title: '正在上传' })
    const { error: uploadError } = await client
      .storage
      .from(config.public.bucketName)
      .upload(`${filePath}`, file, {
        cacheControl: '3600',
        upsert: false,
      })
    if (uploadError)
      throw uploadError

    const { data: urlData, error: urlError } = await client
      .storage
      .from(config.public.bucketName)
      .createSignedUrl(`${filePath}`, 600)
    if (urlError)
      throw urlError

    if (urlData === undefined) {
      toast.add({ title: '上传失败' })
      return
    }
    audioUrl.value = urlData!.signedUrl
    toast.add({ title: '上传成功' })
  }
  catch (error) {
    toast.add({ title: '上传失败', description: (error as any).message })
  }
}
async function onSubmit(key: string) {
  if (key === 'CreateRecTask') {
    // todo 发送请求
    // 1. check 是否为vip
    if (!user.value) {
      toast.add({ title: '请先登录' })
      return
    }
    await $fetch('/api/checkVip', {
      method: 'POST',
      body: JSON.stringify({
        id: user.value?.id,
        vipToken: vipToken.value,
      }),
    }).then((res) => {
      isVip.value = res === undefined ? false : res as boolean
    })
    if (isVip.value === false) {
      toast.add({ title: '您不是vip' })
      return
    }

    // 2. 发送请求
    await $fetch('/api/createRecTask', {
      method: 'POST',
      body: JSON.stringify({
        engineModelType: engineModelType.value,
        audioUrl: audioUrl.value,
      }),
    }).then((res) => {
      if (res === undefined) {
        taskId.value = '请求失败'
        return
      }
      taskId.value = (res as { RequestId: string, TaskId: string }).TaskId
    })
  }
  else if (key === 'DescribeTaskStatus') {
    await $fetch('/api/describeTaskStatus', {
      method: 'POST',
      body: JSON.stringify({
        taskId: taskId.value,
      }),
    }).then((res) => {
      if (res === undefined) {
        taskId.value = '请求失败'
        return
      }
      const response = res as { TaskId: string, Status: string, Result: string }
      taskStatus.value = response.Status
      taskResult.value = response.Result
    })
  }
}

async function saveToTxt() {
  const blob = new Blob([taskResult.value], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, `${fileName.value}.txt`)
}
async function clearStorage() {
  await client.storage.emptyBucket('toolkits-audio')
  toast.add({ title: '清空成功' })
}
</script>

<template>
  <div>
    <UTabs class="w-full" :items="items">
      <template #item="{ item }">
        <UCard class="sm:w-screen-sm p5" @submit.prevent="() => onSubmit(item.key)">
          <template #header>
            <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ item.description }}
            </p>
          </template>
          <div v-if="item.key === 'CreateRecTask'" class="space-y-3">
            <UFormGroup label="邀请码">
              <UInput v-model="vipToken" />
            </UFormGroup>

            <UFormGroup>
              <template #label>
                <div class="flex flex-row items-center space-x-3">
                  <span>引擎模型选择</span>
                  <UTooltip text="点击查看">
                    <UButton to="https://cloud.tencent.com/document/product/1093/37823#2.-.E8.BE.93.E5.85.A5.E5.8F.82.E6.95.B0" variant="ghost" color="gray" icon="i-carbon-information" />
                  </UTooltip>
                </div>
              </template>
              <UInput v-model="engineModelType" placeholder="16k_zh, 16k_en..." />
            </UFormGroup>
            <UFormGroup label="上传音频">
              <UInput type="file" @change="fileUpload" />
            </UFormGroup>
            <UFormGroup v-if="fileName === ''" label="音频Url">
              <UInput v-model="audioUrl" />
            </UFormGroup>
            <UFormGroup label="请求查询ID">
              <UInput v-model="taskId" />
            </UFormGroup>
          </div>
          <div v-if="item.key === 'DescribeTaskStatus'" class="space-y-3">
            <UFormGroup label="请求查询ID">
              <UInput v-model="taskId" />
            </UFormGroup>
            <UFormGroup label="查询状态">
              <UInput v-model="taskStatus" enabled />
            </UFormGroup>
            <UFormGroup label="查询结果">
              <UTextarea v-model="taskResult" autoresize />
            </UFormGroup>
          </div>
          <template #footer>
            <div class=" flex items-center justify-center space-x-5">
              <UButton type="submit" variant="outline" :disabled="audioUrl === ''">
                {{ item.key === 'CreateRecTask' ? '创建请求' : '查询结果' }}
              </UButton>
              <UButton v-show="item.key === 'DescribeTaskStatus'" type="save" variant="outline" @click.prevent="saveToTxt">
                保存到txt
              </UButton>
              <UButton v-if="user?.id === config.public.adminId" variant="outline" @click="clearStorage">
                清空存储
              </UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>
