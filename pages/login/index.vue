<script setup lang="ts">
const isOpen = ref(true)
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
  if (user.value)
    navigateTo('/')
})
</script>

<template>
  <div>
    <UModal
      v-model="isOpen"
      prevent-close
    >
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex justify-end">
            <UButton
              color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 "
              to="/"
            />
          </div>
        </template>
        <div class="p-4">
          <Placeholder class="h-48">
            <h2 class="my-6 text-center text-3xl font-extrabold u-text-white">
              Sign in to your account
            </h2>
            <UButton
              class="mt-3"
              icon="i-mdi-google"
              block
              label="Google"
              variant="outline"
              color="white"
              @click="auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })"
            />
            <UButton
              class="mt-3"
              icon="i-mdi-github"
              block
              label="Github"
              variant="outline"
              color="white"
              @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })"
            />
          </Placeholder>
        </div>
      </UCard>
    </UModal>
  </div>
  <!-- <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <h2 class="my-6 text-center text-3xl font-extrabold u-text-white">
      Sign in to your account
    </h2>

    <UButton
      class="mt-3"
      icon="i-mdi-github"
      block
      label="Github"
      variant="outline"
      @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })"
    />
  </div> -->
</template>
