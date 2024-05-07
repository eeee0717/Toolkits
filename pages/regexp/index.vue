<script setup lang="ts">
import Joi from 'joi'
import type { NamedRegExp } from '~/utils/regexp'
import { regPresetsList } from '~/utils/regexp'
import type { FormSubmitEvent } from '#ui/types'

// 是否开启AI匹配
const auto = ref(true)

const regStr = ref('')
const regFlag = ref<string[]>([])
const reg = ref<RegExp | null>(null)
const regPresetTemp = ref({value:'', label:''})

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
const regTempFlag = ref<RegFlag[]>([regFlagList[0]])
watchEffect(() => {
  regFlag.value = regTempFlag.value.map(item => item.value)
})

watchEffect(() => {
  regStr.value = regPresetTemp.value.value || ''
  console.log(regPresetTemp.value)
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
const scheme = Joi.object({
  docText: Joi.string().required(),
  content: Joi.string().required(),
})

const state = reactive({
  docText: undefined,
  content: undefined,
})
const response = ref<string>('')
async function onSubmit(event: FormSubmitEvent<any>) {
  matchStr.value = event.data.docText
  response.value = "请等待···"
  const content = `匹配原文：${event.data.docText}\n匹配内容:${event.data.content}`
  const str = await AIchat(regPrompt,content)
  if(str===null)
  {
    response.value = '请重新查看'
    return;
  }
  response.value = str!.replace(/`/g,"")
  regStr.value = response.value
}
</script>

<template>
  <div class="w-full p-20px box-border grid grid-cols-2 ">
    <!-- 正则表达式匹配区域 -->
    <div>
      <!-- 输入正则表达式 -->
      <div class="flex justify-start items-center space-x-2">
        <UTooltip :text="`点击${auto ? '关闭' : '开启'}预设正则AI匹配`">
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
        <USelectMenu v-model="regPresetTemp" placeholder="常用正则表达式" :options="regPresetsList" />
      </div>
      <!-- 要匹配的字符串 -->
      <div class="flex mt-20px ">
        <UTextarea v-model="matchStr" class="w-35rem" autoresize :rows="5" :maxrows="5" placeholder="请输入要匹配的字符串" />
      </div>
      <div
        class="max-w-35rem min-h-100px whitespace-pre-wrap  mt-20px px-2px py-4px b border-base border-rounded-1.5"
        v-html="matchingFormat || '无匹配结果'"
      />
      <!-- 输出匹配结果 -->
      <div
        v-if="matchingRes.length > 0"
        class="w-full min-h-100px  whitespace-pre-wrap   mt-20px px-2px py-4px"
      >
        <div>共 {{ matchingRes.length }} 处匹配：</div>
        <div v-for="(res, i) of matchingRes" :key="i">
          {{ res }}
        </div>
      </div>
    </div>
    <!-- AI匹配 -->
    <div v-show="auto">
      <div class="max-w-100 grid grid-auto-flow-row">
        <UForm class="min-w-80 space-y-3" :schema="scheme" :state="state" @submit="onSubmit">
          <UFormGroup label="要匹配的原文" name="docText">
            <UInput v-model="state.docText" />
          </UFormGroup>
          <UFormGroup label="要匹配的内容" name="content">
            <UInput v-model="state.content" />
          </UFormGroup>
          <UButton type="submit">
            AI匹配正则表达式
          </UButton>
        </UForm>
        <div class=" m-t-2">
          <label>AI匹配结果</label>
          <div class="b border-base border-rounded-1.5 min-h-20 p-2" >
            <span text-lg>{{response  }}</span>
          </div>
        </div>
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
  border: 1px solid rgb(255,208,111);
}

.matching2{
  border: 1px solid rgb(231,098,084);
}
</style>
