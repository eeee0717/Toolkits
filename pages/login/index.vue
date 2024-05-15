<script setup lang="ts">
const isOpen = ref(false)

const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
  console.log('user', user.value)
  if (user.value)
    navigateTo('/')
})
onMounted(() => {
  isOpen.value = true
})
</script>

<template>
  <!-- <div>
    <UModal v-model="isOpen">
      <div class="p-4">
        <Placeholder class="h-48">
          <div>
            该页面需要登录才能访问
          </div>
        </Placeholder>
      </div>
    </UModal>
  </div> -->
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
  </div>
</template>
