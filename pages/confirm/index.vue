<script setup lang="ts">
const user = useSupabaseUser()
watch(user, async () => {
  if (user.value) {
    await $fetch('/api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.value?.id,
      }),
    })
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div>
    <p class="u-text-black">
      Redirecting...
    </p>
  </div>
</template>
