<script setup lang="ts">
async function test(event: any) {
  const file = event[0]
  // console.log(file)
  // upload file https://github.com/nuxt/nuxt/issues/15003
  const formData = new FormData()
  formData.append('file', file)
  await $fetch('/api/uploadFile', {
    method: 'POST',
    body: formData,
  })
}
</script>

<template>
  <div>
    <!-- <UButton class="w-20 h-10" size="md" @click="test" /> -->
    <UInput type="file" @change="test" />
  </div>
</template>
