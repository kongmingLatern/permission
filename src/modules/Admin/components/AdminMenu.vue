<template>
	<span
		w-full
		font-semibold
		text-20px
		text-center
		inline-block
		p-1
		px-0
		bg-blue-300
		color-white
		>后台管理</span
	>
	<n-menu
		:options="menuOptions"
		default-value="admin-user"
	/>
</template>

<script lang="ts">
import { defineComponent, h, Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
	BookOutline as BookIcon,
	HomeOutline as HomeIcon,
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
	return () => h(NIcon, null, { default: () => h(icon) })
}

// TODO: 动态菜单 => 动态路由
const menuOptions: MenuOption[] = [
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: 'admin-user',
					},
				},
				{ default: () => '用户管理' }
			),
		key: 'admin-user',
		icon: renderIcon(HomeIcon),
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: 'admin-role',
					},
				},
				{ default: () => '角色管理' }
			),
		key: 'admin-role',
		icon: renderIcon(BookIcon),
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: 'admin-path',
					},
				},
				{ default: () => '路径管理' }
			),
		key: 'admin-path',
		icon: renderIcon(BookIcon),
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: 'admin-department',
					},
				},
				{ default: () => '部门管理' }
			),
		key: 'admin-department',
		icon: renderIcon(BookIcon),
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: 'admin-menu',
					},
				},
				{ default: () => '菜单管理' }
			),
		key: 'admin-menu',
		icon: renderIcon(HomeIcon),
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: 'admin-tenantId',
					},
				},
				{ default: () => '租户管理' }
			),
		key: 'admin-tenantId',
		icon: renderIcon(HomeIcon),
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: 'admin-log',
					},
				},
				{ default: () => '日志管理' }
			),
		key: 'admin-log',
		icon: renderIcon(BookIcon),
	},
]

export default defineComponent({
	setup() {
		return {
			menuOptions,
		}
	},
})
</script>
