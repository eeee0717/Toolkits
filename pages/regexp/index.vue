<script setup lang="ts">
// 是否自动匹配
const auto = ref(true)
const regStr = ref('')
const regFlag = ref<string[]>([])
const regTempFlag = ref<RegFlag[]>([])
const reg = ref<RegExp | null>(null)
watchEffect(() => {
  try {
    reg.value = regStr.value ? new RegExp(regStr.value, regFlag.value.join('')) : null
  }
  catch (e) {
    reg.value = null
  }
})
interface RegFlag {
  label: string
  value: string
}
const regFlagList: RegFlag[] = [
  { label: '-g 全局匹配', value: 'g' },
  { label: '-i 忽略大小写', value: 'i' },
  { label: '-m 多行匹配', value: 'm' },
  { label: '-s 特殊字符', value: 's' },
]
watchEffect(() => {
  regFlag.value = regTempFlag.value.map(item => item.value)
})
// 要匹配的字符串
const matchStr = ref<string>('')
// 匹配结果
const matchingRes = computed(
  () => matchStr.value.match(reg.value!)?.filter(v => v) || [],
)
const matchingFormat = computed(() => {
  let res = ''
  let str = matchStr.value
  let n = 1
  matchingRes.value.forEach((v) => {
    if (n > 2)
      n = 1
    const matchStr = str.substring(0, v.length + str.indexOf(v))
    str = str.substring(v.length + str.indexOf(v))
    res += matchStr.replace(
      v,
      `<span class="matching matching${n}">${v}</span>`,
    )
    n++
  })
  return res + str
})
</script>

<template>
  <div class="max-w-1200px w-full p-20px box-border">
    <!-- 输入正则表达式 -->
    <div class="flex justify-start items-center space-x-2">
      <UTooltip :text="`点击${auto ? '关闭' : '开启'}预设正则自动匹配`">
        <UButton
          class="justify-center items-center"
          color="primary" variant="outline" :icon="`${auto ? 'i-carbon-flash' : 'i-carbon-flash-off'}`"
          @click="auto = !auto"
        />
      </UTooltip>

      <UInput v-model="regStr" placeholder="请输入正则表达式">
        <template #leading>
          <UIcon :class="`${!reg ? 'color-amber' : 'color-emerald'}`" :name="`${!reg ? 'i-carbon-warning-alt' : 'i-carbon-checkmark-outline'}`" dynamic />
          <span class="ml-5px">/</span>
        </template>
        <template #trailing>
          <span class="ml-5px">/{{ reg?.flags || regFlag?.join('') }}</span>
        </template>
      </UInput>

      <USelectMenu v-model="regTempFlag" class="w-35" :options="regFlagList" multiple>
        <template #label>
          <UIcon name="i-carbon-filter" dynamic />
          <span>筛选修饰符</span>
        </template>
      </USelectMenu>
    </div>
    <!-- 要匹配的字符串 -->
    <div class="mt-20px ">
      <UTextarea v-model="matchStr" class="w-md" autoresize :rows="5" :maxrows="5" placeholder="请输入要匹配的字符串" />
    </div>
    <div
      class="w-md min-h-100px whitespace-pre-wrap  mt-20px px-2px py-4px b border-base "
      v-html="matchingFormat || '无匹配结果'"
    />
    <!-- 输出匹配结果 -->
    <div
      v-if="matchingRes.length > 0"
      class="w-full min-h-100px  whitespace-pre-wrap   mt-20px px-2px py-4px "
    >
      <div>共 {{ matchingRes.length }} 处匹配：</div>
      <div v-for="(res, i) of matchingRes" :key="i">
        {{ res }}
      </div>
    </div>
  </div>
</template>

<style>
.matching {
  padding-left: 0px;
  padding-right: 0px;
  border-radius: 2px;
  box-sizing: border-box;
}

.matching1 {
  background-color: rgb(255,208,111);
}

.matching2{
  background-color: rgb(231,098,084);
}
</style>
