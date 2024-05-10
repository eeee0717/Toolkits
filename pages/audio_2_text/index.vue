<script setup lang="ts">
const items = [{
  key: 'CreateRecTask',
  label: '录音文字识别请求',
  description: '创建录音转文字请求',
}, {
  key: 'DescribeTaskStatus',
  label: '识别结果查询',
  description: '查询录音转文字任务的处理状态',
}]

const engineModelType = ref<string>('16k_zh')
const audioName = useLocalStorage('audioName', '')
const audioUrl = useLocalStorage('audioUrl', '')
const secretId = useLocalStorage('secretId', '')
const secretKey = useLocalStorage('secretKey', '')
const taskId = useLocalStorage('taskId', '')

const taskList = useLocalStorage<{ name: string, taskId: string }[]>('taskList', [])
async function onSubmit(key: string) {
  if (key === 'CreateRecTask') {
    await $fetch('/api/createRecTask', {
      method: 'POST',
      body: JSON.stringify({
        secretId: secretId.value,
        secretKey: secretKey.value,
        engineModelType: engineModelType.value,
        audioUrl: audioUrl.value,
      }),
    }).then((res) => {
      if (res === undefined) {
        taskId.value = '请求失败'
        return
      }
      taskId.value = (res as { RequestId: string, TaskId: string }).TaskId
      taskList.value.push({
        name: audioName.value,
        taskId: taskId.value,
      })
    })
  }
}
</script>

<template>
  <div>
    <UTabs class="w-full" :items="items">
      <template #item="{ item }">
        <UCard class="w-200" @submit.prevent="() => onSubmit(item.key)">
          <template #header>
            <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ item.description }}
            </p>
          </template>
          <div v-if="item.key === 'CreateRecTask'" class="space-y-3">
            <UFormGroup label="Secret Id">
              <UInput v-model="secretId" />
            </UFormGroup>
            <UFormGroup label="Secret Key">
              <UInput v-model="secretKey" />
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
            <UFormGroup label="Name">
              <UInput v-model="audioName" />
            </UFormGroup>
            <UFormGroup label="音频Url">
              <UInput v-model="audioUrl" />
            </UFormGroup>
            <UFormGroup label="请求查询ID">
              <UInput v-model="taskId" />
            </UFormGroup>
          </div>
          <template #footer>
            <div class=" flex items-center justify-center">
              <UButton type="submit" variant="outline">
                {{ item.key === 'CreateRecTask' ? '创建请求' : '查询结果' }}
              </UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>
