import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    'border-base': 'border-gray:50',
    'bg-active': 'bg-gray:10',
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
