<template>
	<n-layout has-sider>
		<n-layout-sider
			bordered
			collapse-mode="width"
			:collapsed-width="64"
			:width="240"
			:collapse="false"
			show-trigger
			p-0
		>
			<span
				class="text-[20px] font-semibold pl-1rem pt-1 text-center inline-block"
				>角色权限分配</span
			>
			<n-menu
				:collapsed-width="64"
				:collapsed-icon-size="22"
				:options="menuOptions"
				:render-label="renderMenuLabel"
				:render-icon="renderMenuIcon"
				:expand-icon="expandIcon"
			/>
		</n-layout-sider>
		<n-layout>
			<span>123123123</span>
		</n-layout>
	</n-layout>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
	BookmarkOutline,
	CaretDownOutline,
} from '@vicons/ionicons5'

const menuOptions: MenuOption[] = [
	{
		label: '用户管理',
		key: 'hear-the-wind-sing',
	},
	{
		label: '角色管理',
		key: 'pinball-1973',
		disabled: true,
		children: [
			{
				label: '鼠',
				key: 'rat',
			},
		],
	},
	{
		label: '菜单管理',
		key: 'a-wild-sheep-chase',
		disabled: true,
	},
	{
		label: '权限管理',
		key: 'dance-dance-dance',
		children: [
			{
				type: 'group',
				label: '接口',
				key: 'people',
				children: [
					{
						label: '叙事者',
						key: 'narrator',
					},
					{
						label: '羊男',
						key: 'sheep-man',
					},
				],
			},
			{
				label: '饮品',
				key: 'beverage',
				children: [
					{
						label: '威士忌',
						key: 'whisky',
					},
				],
			},
			{
				label: '食物',
				key: 'food',
				children: [
					{
						label: '三明治',
						key: 'sandwich',
					},
				],
			},
			{
				label: '过去增多，未来减少',
				key: 'the-past-increases-the-future-recedes',
			},
		],
	},
]

export default defineComponent({
	setup() {
		return {
			menuOptions,
			renderMenuLabel(option: MenuOption) {
				if ('href' in option) {
					return h(
						'a',
						{ href: option.href, target: '_blank' },
						option.label as string
					)
				}
				return option.label as string
			},
			renderMenuIcon(option: MenuOption) {
				// 渲染图标占位符以保持缩进
				if (option.key === 'sheep-man') return true
				// 返回 falsy 值，不再渲染图标及占位符
				if (option.key === 'food') return null
				return h(NIcon, null, {
					default: () => h(BookmarkOutline),
				})
			},
			expandIcon() {
				return h(NIcon, null, {
					default: () => h(CaretDownOutline),
				})
			},
		}
	},
})
</script>
