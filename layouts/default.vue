<script setup lang="ts">

</script>

<template>
  <main class="w-screen h-screen of-hidden" grid="~ rows-[max-content_1fr]">
    <TheNav />
    <div class="h-full of-hidden overflow-scroll grid grid-cols-[1fr_6fr]">
      <ToolNav class="border-r border-base" />
      <div class="w-full container-p-base flex justify-center">
        <slot />
      </div>
      <UNotifications class="w-100" />
    </div>
  </main>
</template>
