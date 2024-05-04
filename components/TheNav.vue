<template>
  <nav px6 py4 text-lg border="b base" flex="~ gap-2 items-center">
    <NuxtLink
      flex
      href="/"
    >
      <div i-carbon-campsite text-4xl />
      <span text-2xl>Toolkits</span>
    </NuxtLink>
    <div flex-auto />
    <ColorSchemeToggle />
    <NuxtLink
      p2 rounded
      hover="bg-active"
      href="https://github.com/eeee0717/Toolkits"
      target="_blank"
    >
      <div i-carbon-logo-github text-2xl />
    </NuxtLink>
  </nav>
</template>
