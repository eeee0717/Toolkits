<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseClient()
async function test() {
  await $fetch('/api/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: user.value?.id,
    }),
  })
  console.log('User added')
}
</script>

<template>
  <div>
    <UButton class="w-20 h-10" size="md" @click="test" />
  </div>
</template>
