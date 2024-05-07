<script setup lang="ts">
import Joi from 'joi';
import type { FormSubmitEvent } from '#ui/types'

const isOpenaiKeyShow = ref(false)

const scheme = Joi.object({
  openaiKey: Joi.string().required(),
})

const state = reactive({
  openaiKey: undefined,
})

async function onSave(event: FormSubmitEvent<any>) {
  console.log(event.data)
  const userSettings = {
    openaiKey : event.data.openaiKey
  }
  localStorage.setItem('userSettings', JSON.stringify(userSettings))
  console.log('保存成功')
}
</script>

<template>
  <div class="w-full ">
    <div>
      <p class="w-full flex justify-center items-center" text-3xl>设置</p>
    </div>
   <UForm :schema="scheme" :state="state" @submit="onSave">
    <div class="grid-col2-base">
      <div class="grid-col2-base flex items-center justify-center">
        <p>OpenAI Base Url</p>
        <UInput
            v-model="state.openaiKey"
            :type="`${isOpenaiKeyShow ? 'text' : 'password'}`"
            placeholder="请输入您的密钥"
            :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="state.openaiKey !== ''"
              color="gray"
              variant="link"
              :icon="`${isOpenaiKeyShow ? 'i-heroicons-eye-slash-16-solid' : 'i-heroicons-eye-16-solid'}`"
              :padded="false"
              @click="isOpenaiKeyShow = !isOpenaiKeyShow"
            />
          </template>
        </UInput>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <UButton class="w-20 flex justify-center items-center" type="submit">
        保存
      </UButton>
    </div> 
   </UForm>
  </div>
</template>
