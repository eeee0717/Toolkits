<script setup lang="ts">
const inputName = ref('')
const inputApiUrl = ref('')
const inputApiKey = ref('')
const models = ref<string[]>([])
const selectedModel = ref('')
async function save() {
  // useLocalStorage(inputName.value, inputName.value)
  // useLocalStorage(`${inputName.value}ApiUrl`, inputApiUrl.value)
  // useLocalStorage(`${inputName.value}ApiKey`, inputApiKey.value)
  const ai = new AI(inputApiUrl.value, inputApiKey.value)
  models.value = await ai.getModels()
}
</script>

<template>
  <div class="w-full grid grid-cols-5 gap-5 flex items-center justify-center">
    <div class="flex items-center justify-center grid grid-cols-[1fr_2fr] gap-5">
      <label>Name</label>
      <UInput v-model="inputName" class="w-50" placeholder="OpenAI" type="text" />
    </div>
    <div class="flex items-center justify-center grid grid-cols-[1fr_2fr] gap-5">
      <label>Api Url</label>
      <UInput v-model="inputApiUrl" class="w-50" placeholder="https://api.openai.com/v1" type="text" />
    </div>
    <div class="flex items-center justify-center grid grid-cols-[1fr_2fr] gap-5">
      <label>Api Key</label>
      <UInput v-model="inputApiKey" class="w-50" placeholder="sk-xxxxx" type="text" />
    </div>
    <USelect v-model="selectedModel" class="w-30" :options="models" />
    <UButton class="w-30 flex items-center justify-center" variant="outline" @click="save">
      Save
    </UButton>
  </div>
</template>
