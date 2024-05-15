<script setup lang="ts">
const isAuth = ref(false)
const user = useSupabaseUser()
const avatarUrl = ref('')
watchEffect(() => {
  const userMeta = JSON.parse(JSON.stringify(user.value?.user_metadata))
  if (user.value) {
    avatarUrl.value = userMeta.avatar_url
    isAuth.value = true
  }
})
</script>

<template>
  <nav px6 py4 text-lg border="b base" flex="~ gap-2 items-center">
    <NuxtLink
      flex
      href="/"
    >
      <div i-carbon-campsite text-4xl />
      <span text-2xl>Toolkits</span>
    </NuxtLink>
    <div flex-auto />
    <NuxtLink flex href="/settings">
      <div i-carbon-settings text-2xl />
    </NuxtLink>
    <ColorSchemeToggle />
    <NuxtLink
      p2 rounded
      hover="bg-active"
      href="https://github.com/eeee0717/Toolkits"
      target="_blank"
    >
      <div i-carbon-logo-github text-2xl />
    </NuxtLink>
    <div>
      <div v-if="isAuth" class="flex  items-center justify-center">
        <UAvatar size="xs" :src="avatarUrl" />
      </div>
      <div v-else class="flex  items-center justify-center">
        <UButton label="登录" variant="ghost" to="/login" />
      </div>
    </div>
  </nav>
</template>
