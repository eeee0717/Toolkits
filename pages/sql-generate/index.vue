<script setup lang="ts">
const aiServices = useLocalStorage('aiServices', [])
const models = ref<string[]>(aiServices.value.map((aiService: AIService) => aiService.models).flat())
const selectedModel = ref<string>('')
const selectAIService = ref<AIService>({ name: '', apiUrl: '', apiKey: '', selectedModel: '', models: [], checked: false })
const content = ref('')
const response = ref('')
const sqlCommand = ref(`
  - **SELECT** - 从数据库中提取数据
  - **UPDATE** - 更新数据库中的数据
  - **DELETE** - 从数据库中删除数据
  - **INSERT INTO** - 向数据库中插入新数据
  - **CREATE DATABASE** - 创建新数据库
  - **ALTER DATABASE** - 修改数据库
  - **CREATE TABLE** - 创建新表
  - **ALTER TABLE** - 变更（改变）数据库表
  - **DROP TABLE** - 删除表
  - **CREATE INDEX** - 创建索引（搜索键）
  - **DROP INDEX** - 删除索引
`)

watchEffect(() => {
  selectAIService.value = aiServices.value.find((aiService: AIService) => aiService.models.includes(selectedModel.value)) || { name: '', apiUrl: '', apiKey: '', selectedModel: '', models: [], checked: false }
})

async function generateSQL() {
  response.value = '请等待生成'
  const ai = new AI(selectAIService.value.apiUrl, selectAIService.value.apiKey)
  response.value = await ai.getCompletions(selectedModel.value, sqlPrompt, `我的问题是: ${content.value}`).then((response: any) => response)
}
</script>

<template>
  <div class="grid grid-cols-[3fr_1fr] gap-7 w-full">
    <div class=" grid grid-cols-[1fr_1fr] gap-7">
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
      <div class="b-l border-base m-1">
        <MDC
          v-slot="{ body }"
          :value="response"
        >
          <article class="p-4  ">
            <MDCRenderer
              v-if="body"
              :body="body"
            />
          </article>
        </MDC>
      </div>
    </div>
    <div class="b-l border-base">
      <MDC class="m-4 flex items-center justify-center" :value="sqlCommand" tag="article" />
    </div>
  </div>
</template>

<style scoped>
pre {
  padding: 1em 0 !important;
  --tw-prose-pre-bg: #8881 !important;

}
.line {
  display: block;
  padding: 0 1rem;

}
.line.highlight {
  width: 100%;

}
</style>
