<script setup lang="ts">
import { navLinks } from '~/utils/navLinks'

const links = navLinks
</script>

<template>
  <div class="p2">
    <UVerticalNavigation :links="links" />
  </div>
</template>
