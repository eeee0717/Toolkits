<script setup lang="ts">
import { InputData, jsonInputForTargetLanguage, quicktype } from 'quicktype-core'

const jsonData = ref<string>('')
async function quicktypeJSON(targetLanguage: string, typeName: string, jsonString: string) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage)
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  })
  const inputData = new InputData()
  inputData.addInput(jsonInput)

  return await quicktype({
    inputData,
    lang: targetLanguage,
  })
}
const objectData = ref('')
async function convertClick() {
  const { lines: result } = await quicktypeJSON('csharp', 'Data', jsonData.value)
  objectData.value = result.join('\n')
}
</script>

<template>
  <div
    class="w-full p-4 flex flex-col justify-start items-center space-y-4"
  >
    <UButton variant="outline" @click="convertClick">
      Convert to Entity
    </UButton>
    <div class="w-full grid-col2-base">
      <UTextarea v-model="jsonData" placeholder="请将Json数据复制在这里" :rows="40" autoresize class=" w-full whitespace-pre-wrap" />
      <UTextarea v-model="objectData" :rows="40" autoresize class=" w-full whitespace-pre-wrap" />
    </div>
  </div>
</template>
