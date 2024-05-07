<script setup lang="ts">
const isOpenaiKeyShow = ref(false)
const openaiKey = ref('')
function show() {
  console.log('111')
}

</script>

<template>
  <div class="w-full ">
    <div>
        <p class="w-full flex justify-center items-center" text-3xl>设置</p>
      </div>
   <UFormGroup>
    <div class="grid-col2-base">
      <div class="grid-col2-base flex items-center justify-center">
        <p>OpenAI Base Url</p>
        <UInput
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

      </div>
    </div>
   </UFormGroup>
  </div>
</template>
