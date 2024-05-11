<script setup lang="ts">
const aiServices = useLocalStorage('aiServices', [])
const models = ref<string[]>(aiServices.value.map((aiService: AIService) => aiService.models).flat())
const selectedModel = ref<string>('')
const selectAIService = ref<AIService>({ name: '', apiUrl: '', apiKey: '', selectedModel: '', models: [], checked: false })
watchEffect(() => {
  selectAIService.value = aiServices.value.find((aiService: AIService) => aiService.models.includes(selectedModel.value)) || { name: '', apiUrl: '', apiKey: '', selectedModel: '', models: [], checked: false }
})
</script>

<template>
  <div class="grid grid-cols-[3fr_1fr] gap-7">
    <div class="b b-1 grid grid-cols-[1fr_1fr] gap-7">
      <div class="m-2 space-y-3">
        <UTextarea class="w-100" :rows="6" placeholder="请描述想要生成的sql语句情况" />
        <div class="flex flex-row">
          <label class="min-w-20 flex justify-center items-center">模型选择</label>
          <USelect v-model="selectedModel" class="w-full flex justify-center items-center" :options="models" />
        </div>
      </div>
    </div>
    <div class="b b-1">
      hello
    </div>
  </div>
</template>
