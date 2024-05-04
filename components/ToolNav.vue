<script setup lang="ts">
const links = [{
  label: '正则表达式',
  icon: 'i-heroicons-command-line',
  to: '/reg',
}, {
  label: '格式转换',
  icon: 'i-heroicons-code-bracket-square',
  to: '/transform',
}]
</script>

<template>
  <div class="p2">
    <UVerticalNavigation :links="links" />
  </div>
</template>
