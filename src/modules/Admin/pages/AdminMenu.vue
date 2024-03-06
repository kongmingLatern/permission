<template>
	<admin-layout
		:is-page-query="false"
		:get-url="urls.permission.list"
		:columns="columns"
	></admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '@/modules/Admin/layout/AdminLayout.vue'
import { urls } from '@/api'
import dayjs from 'dayjs'
import { h } from 'vue'
import { NTag } from 'naive-ui'
// TODO: 菜单编辑表单未做

const columns = [
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
]
</script>

<style scoped></style>

<!-- <template>
	<admin-table
		:data="data"
		:columns="createColumns()"
		row-key="id"
	></admin-table>
</template>

<script setup lang="ts">
import { http, urls } from '@/api'
import AdminTable from '@/modules/Admin/components/AdminTable.vue'
import dayjs from 'dayjs'
import {
	NButton,
	type DataTableColumns,
	NTag,
} from 'naive-ui'
import { h, onMounted, ref } from 'vue'

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

const data = ref<RowData[]>([])
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

onMounted(async () => {
	data.value = (await http.get(urls.permission.list)) as any
})
</script>

<style scoped></style> -->
