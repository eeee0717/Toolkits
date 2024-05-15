<script setup lang="ts">
const user = useSupabaseUser()
async function test() {
  await $fetch('/api/checkVip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: user.value?.id,
    }),
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div>
    <UButton class="w-20 h-10" size="md" @click="test" />
  </div>
</template>
