<script setup lang="ts">
import { sqlPrompt } from '~/utils/system-prompts'

const aiServices = useLocalStorage('aiServices', [])
const models = ref<string[]>(aiServices.value.map((aiService: AIService) => aiService.models).flat())
const selectedModel = ref<string>('')
const selectAIService = ref<AIService>({ name: '', apiUrl: '', apiKey: '', selectedModel: '', models: [], checked: false })
const content = ref('')
const response = ref('')
watchEffect(() => {
  selectAIService.value = aiServices.value.find((aiService: AIService) => aiService.models.includes(selectedModel.value)) || { name: '', apiUrl: '', apiKey: '', selectedModel: '', models: [], checked: false }
})

async function generateSQL() {
  const ai = new AI(selectAIService.value.apiUrl, selectAIService.value.apiKey)
  response.value = await ai.getCompletions(selectedModel.value, sqlPrompt, `我的问题是: ${content.value}`).then((response: any) => response)
}
</script>

<template>
  <div class="grid grid-cols-[3fr_1fr] gap-7 w-full">
    <div class="b b-1 grid grid-cols-[1fr_1fr] gap-7">
      <div class="m-2 space-y-3 w-full">
        <UTextarea
          v-model="content" class="w-full" :rows="10" placeholder="请描述想要生成的sql语句情况&#10;例如: 在school表中查询所有age>=18的学生&#10;school表的属性为: | id | name | age | gender |"
        />
        <div class="flex flex-row items-center justify-center">
          <label class="min-w-20 flex justify-center items-center">模型选择</label>
          <USelect v-model="selectedModel" class="flex justify-center items-center" :options="models" />
        </div>
        <div class="w-full flex justify-center items-center ">
          <UButton variant="outline" label="生成SQL语句" @click="generateSQL" />
        </div>
      </div>
      <div class="b border-base m-2" />
    </div>
    <div class="b b-1">
      hello
    </div>
  </div>
</template>
