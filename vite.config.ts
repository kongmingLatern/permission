import Unocss from 'unocss/vite'
import { defineConfig } from 'vitest/config'
import path from 'node:path'
import presetAttributify from '@unocss/preset-attributify'
import presetUno from '@unocss/preset-uno'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
	test: {
		globals: true,
	},
	plugins: [
		vue(),
		vueJsx(),
		Unocss({
			presets: [presetUno(), presetAttributify()],
			shortcuts: {
				'absolute-center':
					'absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]',
			},
		}),
	],
	server: {
		proxy: {
			'^/api': {
				target: 'http://172.17.12.224:8000/', // 将要代理的目标地址
				changeOrigin: true, // 是否改变源地址
				rewrite: path => path.replace(/^\/api/, ''), // 重写路径: 去掉路径中的 `/api`
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
