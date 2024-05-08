<script setup lang="ts">
import VueQrcode from '@chenfengyuan/vue-qrcode'

const context = ref('')
</script>

<template>
  <div class=" space-y-3">
    <label class="flex justify-center" text-3xl>
      QR Code生成器
    </label>
    <div class="w-full flex items-center justify-center">
      <UTextarea v-model="context" class="flex justify-center w-80" resize placeholder="请输入要存储的文本" />
    </div>
    <div class="w-full flex justify-center">
      <figure class="qrcode">
        <VueQrcode
          :value="context === '' ? '请输入要存储的文本' : context"
        />
        <img
          class="qrcode__image"
          src="/public/Avator.jpeg"
        >
      </figure>
    </div>
  </div>
</template>

<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin-bottom: 0;
  position: relative;
}
.qrcode__image {
  background-color: #fff;
  border: 0.25rem solid #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 15%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 15%;
}
</style>
