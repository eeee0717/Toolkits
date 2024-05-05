<script setup lang="ts">
// 是否自动匹配
const auto = ref(true)
const regStr = ref('')
const regFlag = ref([])
const reg = ref<RegExp | null>(null)
watchEffect(() => {
  try {
    reg.value = regStr.value ? new RegExp(regStr.value, regFlag.value.join('')) : null
  }
  catch (e) {
    reg.value = null
  }
})
</script>

<template>
  <div class="max-w-1200px w-full p-20px box-border">
    <!-- 上 -->
    <div class="flex justify-start items-center space-x-2">
      <UTooltip :text="`点击${auto ? '关闭' : '开启'}预设正则自动匹配`">
        <UButton
          class="justify-center items-center"
          color="primary" size="sm" variant="outline" :icon="`${auto ? 'i-carbon-flash' : 'i-carbon-flash-off'}`"
          @click="auto = !auto"
        />
      </UTooltip>

      <UInput v-model="regStr" size="md" placeholder="请输入正则表达式">
        <template #leading>
          <UIcon :class="`${!reg ? 'color-amber' : 'color-emerald'}`" :name="`${!reg ? 'i-carbon-warning-alt' : 'i-carbon-checkmark-outline'}`" dynamic />
          <span class="ml-5px">/</span>
        </template>
        <template #trailing>
          <span class="ml-5px">/</span>
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
