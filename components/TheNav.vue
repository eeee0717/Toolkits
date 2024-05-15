<script setup lang="ts">
const isAuth = ref(false)
const user = useSupabaseUser()
const avatarUrl = ref('')
const items = [
  [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
  }],
]
watchEffect(() => {
  if (user.value) {
    const userMeta = JSON.parse(JSON.stringify(user.value?.user_metadata))
    avatarUrl.value = userMeta.avatar_url
    isAuth.value = true
  }
  else {
    isAuth.value = false
  }
})
function logout() {
  const supabase = useSupabaseClient()
  supabase.auth.signOut()
}
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
        <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
          <UAvatar size="xs" :src="avatarUrl" />
          <template #item="{ item }">
            <UButton class="w-full" color="gray" variant="ghost" :label="item.label" @click="logout">
              <template #trailing>
                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
              </template>
            </UButton>
          </template>
        </UDropdown>
      </div>
      <div v-else class="flex  items-center justify-center">
        <UButton label="登录" color="gray" variant="ghost" to="/login" />
      </div>
    </div>
  </nav>
</template>
