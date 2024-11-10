<script setup lang="ts">
interface AIService {
  name: string
  apiUrl: string
  apiKey: string
  selectedModel: string
  models: string[]
  checked: boolean
}
const aiServices = ref<AIService[]>([{
  name: '',
  apiUrl: '',
  apiKey: '',
  selectedModel: '',
  models: [],
  checked: false,
}])
const aiServicesStorage = useLocalStorage<AIService[]>('aiServices', [])

// 修改 save 函数
async function save(aiService: AIService) {
  try {
    const ai = new AI(aiService.apiUrl, aiService.apiKey)
    const models = await ai.getModels()
    aiService.models = models
    aiService.checked = true

    // 添加到 aiServices 数组
    aiServices.value.push(aiService)

    // 同步到 localStorage
    aiServicesStorage.value = aiServices.value

    console.warn('AI Service saved:', aiServices.value)
  }
  catch (error) {
    console.error('Failed to save AI service:', error)
  }
}

// 在 onMounted 中加载数据
onMounted(() => {
  // 从 localStorage 读取数据
  if (aiServicesStorage.value.length > 0)
    aiServices.value = aiServicesStorage.value
})
</script>

<template>
  <ul class="space-y-3">
    <li v-for="aiService, idx in aiServices" :key="idx">
      <div class="w-full grid grid-cols-5 gap-5 flex items-center justify-center">
        <div class="flex items-center justify-center grid grid-cols-[1fr_2fr] gap-5">
          <label>Name</label>
          <UInput v-model="aiService.name" class="w-50" placeholder="OpenAI" type="text" />
        </div>
        <div class="flex items-center justify-center grid grid-cols-[1fr_2fr] gap-5">
          <label>Api Url</label>
          <UInput v-model="aiService.apiUrl" class="w-50" placeholder="https://api.openai.com/v1" type="text" />
        </div>
        <div class="flex items-center justify-center grid grid-cols-[1fr_2fr] gap-5">
          <label>Api Key</label>
          <UInput v-model="aiService.apiKey" class="w-50" placeholder="sk-xxxxx" type="text" />
        </div>
        <USelect v-model="aiService.selectedModel" class="w-30" :options="aiService.models" />
        <UButton class="w-20 flex items-center justify-center" variant="outline" :color="aiService.checked ? 'primary' : 'red'" @click="save(aiService)">
          {{ aiService.checked ? '验证通过' : '等待验证' }}
        </UButton>
      </div>
    </li>
  </ul>
</template>
