<script setup lang="ts">
// 是否自动匹配
const auto = ref(true)
</script>

<template>
  <div class="max-w-1200px w-full p-20px box-border">
    <!-- 上 -->
    <div class="flex justify-start items-center space-x-2">
      <UTooltip :text="`点击${auto ? '关闭' : '开启'}预设正则自动匹配`">
        <UButton
          class="w-8 h-8 justify-center items-center"
          color="primary" size="sm" variant="outline" :icon="`${auto ? 'i-carbon-flash' : 'i-carbon-flash-off'}`"
          @click="auto = !auto"
        />
      </UTooltip>
      <UInput>
        <template #leading>
          <UIcon name="i-carbon-warning-alt" dynamic />
        </template>
      </UInput>
    </div>
    <!-- 中 -->
    <div class="mt-20px bg-[var(--color-fill-2)]">
      <p>2</p>
    </div>
    <!-- 下 -->
    <div class="w-full mt-20px">
      <p>3</p>
    </div>
  </div>
</template>
