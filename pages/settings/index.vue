<script setup lang="ts">


const isOpenaiKeyShow = ref(false)
const openaiKey = useLocalStorage('openaiKey', '')
const openaiBaseUrl = useLocalStorage('openaiBaseUrl', 'https://api.openai.com/v1')
const selectedModel = useLocalStorage('selectedModel', '')
const modelList= useLocalStorage('modelList', [] as string[])

async function clickTest() {
  console.log('clicked')
  if(modelList.value.length > 0){
    return
  }
  modelList.value = await GetModelList()

}
</script>

<template>
  <div class="w-full ">
    <div>
      <label class="w-full flex justify-center items-center m-2" text-3xl>设置</label>
    </div>
    <div class="grid grid-cols-[3fr_3fr_3fr_1fr]">
      <div class="grid-col2-base flex items-center justify-center">
        <label class="flex">OpenAI Key</label>
        <ClientOnly>
        <UInput
            class="flex "
            v-model="openaiKey"
            :type="`${isOpenaiKeyShow ? 'text' : 'password'}`"
            placeholder="请输入您的密钥"
            :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="openaiKey !== ''"
              color="gray"
              variant="link"
              :icon="`${isOpenaiKeyShow ? 'i-heroicons-eye-slash-16-solid' : 'i-heroicons-eye-16-solid'}`"
              :padded="false"
              @click="isOpenaiKeyShow = !isOpenaiKeyShow"
            />
          </template>
        </UInput>
        </ClientOnly> 
      </div>
      <div class="grid-col2-base flex items-center justify-center">
        <label class="flex">OpenAI Base Url</label>
        <ClientOnly>

        <UInput
            class="flex "
            v-model="openaiBaseUrl"
            type="text"
            placeholder="请输入您的密钥"
        >
        </UInput>
        </ClientOnly>
      </div>
      <div class="grid-col2-base flex items-center justify-center">
        <label>模型选择</label>
        <ClientOnly>
          <USelect class="flex max-w-60" v-model="selectedModel" :options="modelList"/>
        </ClientOnly>
        
      </div>
      <div class="flex" >
        <UButton variant="outline" label="验证" @click="clickTest"/>
      </div>
    </div>

  </div>
</template>
