<template>
	<admin-table
		:data="data"
		:columns="createColumns()"
		row-key="id"
	></admin-table>
</template>

<script setup lang="ts">
import AdminTable from '@/modules/Admin/components/AdminTable.vue'
import dayjs from 'dayjs'
import {
	NButton,
	type DataTableColumns,
	NTag,
} from 'naive-ui'
import { h } from 'vue'

type RowData = {
	createBy: string
	createTime: Date
	updateBy: string
	updateTime: Date

	name: string
	path: string
	icon: string

	componentPath: string
	componentName: string

	redirect: string
	menuType: string
	description: string
	children: RowData[]
}

const createColumns = (): DataTableColumns<RowData> => [
	{
		type: 'selection',
	},
	{
		title: '菜单名称',
		key: 'name',
	},
	{
		title: '菜单路径',
		key: 'path',
	},
	{
		title: '图标',
		key: 'icon',
	},
	{
		title: '组件名称',
		key: 'componentName',
	},
	{
		title: '组件路径',
		key: 'componentPath',
	},
	{
		title: '重定向路径',
		key: 'redirect',
	},
	{
		title: '菜单类型',
		key: 'menyType',
		render: row => {
			if (Number(row.menuType) == 0) {
				return h(NTag, {}, { default: () => '菜单' })
			} else if (Number(row.menuType) == 1) {
				return h(NTag, {}, { default: () => '页面' })
			} else if (Number(row.menuType) == 2) {
				return h(NTag, {}, { default: () => '路径' })
			} else {
				return h(NTag, {}, { default: () => '未知' })
			}
		},
	},
	{
		title: '创建者',
		key: 'createBy',
	},
	{
		title: '创建时间',
		key: 'createTime',
		render(row) {
			return dayjs(row.createTime).format(
				'YYYY-MM-DD hh:mm:ss'
			)
		},
	},
	{
		title: '更新者',
		key: 'createBy',
	},
	{
		title: '更新时间',
		key: 'createTime',
		render(row) {
			return dayjs(row.createTime).format(
				'YYYY-MM-DD hh:mm:ss'
			)
		},
	},
	{
		title: '操作',
		key: 'actions',
		render(row) {
			return h(
				NButton,
				{
					strong: true,
					tertiary: true,
					size: 'small',
					onClick: () => {
						console.log(row)
					},
				},
				{ default: () => '操作' }
			)
		},
	},
]

const data = Array.from({ length: 46 }).map((_, index) => ({
	id: `${index}`,
	createBy: `system${index}`,
	createTime: '2024-03-01T12:00:00.000Z',
	updateBy: `admin${index}`,
	updateTime: '2024-03-05T10:00:00.000Z',
	name: '仪表盘',
	path: '/dashboard',
	icon: 'dashboard',
	componentPath: '/dashboard/index',
	componentName: 'Dashboard',
	redirect: '/dashboard/index',
	menuType: index % 2,
	description: '系统仪表盘，提供系统概览',
	children: [
		{
			id: `100-${index}`,
			createBy: 'system',
			createTime: '2024-03-01T13:00:00.000Z',
			updateBy: 'user1',
			updateTime: '2024-03-05T10:15:00.000Z',
			name: '工作台',
			path: '/dashboard/workplace',
			icon: 'workplace',
			componentPath: '/dashboard/workplace',
			componentName: 'Workplace',
			redirect: '',
			menuType: 'SUBMENU',
			description: '个人工作台，任务和项目管理',
			children: [],
		},
	],
}))
</script>

<style scoped></style>
