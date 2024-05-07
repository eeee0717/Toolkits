import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({

  shortcuts: {
    'border-base': 'border-gray:50',
    'bg-active': 'bg-gray:10',
    'container-p-base': 'p2',
    'grid-col2-base':'grid grid-cols-2 gap-20'
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
