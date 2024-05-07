import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({

  shortcuts: {
    'border-base': 'border-gray:50',
    'bg-active': 'bg-gray:10',
    'container-p-base': 'p2',
    'grid-col2-base': 'grid grid-cols-2 gap-10',
    'grid-col4-base': 'grid grid-cols-4 gap-2',
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
