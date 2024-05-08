<script setup lang="ts">
import { InputData, jsonInputForTargetLanguage, quicktype } from 'quicktype-core'

const jsonString = `{
  "name": "张三",
  "age": 18
}`

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
async function onClick() {
  const { lines: csharpData } = await quicktypeJSON('csharp', 'Data', jsonString)
  console.log('csharpData', csharpData)
}
</script>

<template>
  <div>
    <UButton @click="onClick">
      Convert to Entity
    </UButton>
  </div>
</template>
