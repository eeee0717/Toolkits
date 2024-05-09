<script setup lang="ts">
import apiSetting from '../../components/apiSetting.vue'

const isOpen = ref(false)
</script>

<template>
  <div class=" w-full space-y-3">
    <UButton label="API设置" variant="outline" @click="isOpen = true">
      <template #trailing>
        <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
      </template>
    </UButton>
    <UModal v-model="isOpen" fullscreen :overlay="false">
      <div class="w-full">
        <Placeholder class="space-y-3">
          <h1 text-3xl class="flex items-center justify-center">
            API 设置
          </h1>
          <apiSetting />
        </Placeholder>
      </div>
    </UModal>
  </div>
</template>
