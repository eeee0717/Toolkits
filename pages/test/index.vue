<script setup lang="ts">
async function test(event: any) {
  const file = event[0]
  console.log(file)
  // upload file https://github.com/nuxt/nuxt/issues/15003
  const client = await useSupabaseClient()

  const { data: uploadData, error: uploadError } = await client
    .storage
    .from('toolkits-audio')
    .upload(`${file.name}`, file, {
      cacheControl: '3600',
      upsert: false,
    })
  console.log(uploadData, uploadError)

  const { data: urlData, error: urlError } = await client
    .storage
    .from('toolkits-audio')
    .createSignedUrl(`${file.name}`, 600)
  console.log(urlData, urlError)
}
</script>

<template>
  <div>
    <!-- <UButton class="w-20 h-10" size="md" @click="test" /> -->
    <UInput type="file" @change="test" />
  </div>
</template>
