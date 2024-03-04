import Unocss from 'unocss/vite'
import { defineConfig } from 'vitest/config'
import path from 'node:path'
import presetAttributify from '@unocss/preset-attributify'
import presetUno from '@unocss/preset-uno'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	test: {
		globals: true,
	},
	plugins: [
		vue(),
		Unocss({
			presets: [presetUno(), presetAttributify()],
			shortcuts: {
				'absolute-center':
					'absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]',
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
