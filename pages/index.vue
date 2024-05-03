<script setup lang="ts">
import { useMouse } from '@vueuse/core';


const {x, y} = useMouse()

</script>

<template>
  <div>
   hello world {{ x }},{{ y }}
  </div>
</template>
