<template>
	<admin-layout
		:get-url="urls.department.page"
		:delete-url="urls.department.remove"
		:columns="columns"
		:form="form"
	></admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '@/modules/Admin/layout/AdminLayout.vue'
import { urls } from '@/api'
import dayjs from 'dayjs'
const columns = [
	{
		title: '部门名称',
		key: 'departmentName',
	},
	{
		title: '部门编号',
		key: 'departmentCode',
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
		title: '更新时间',
		key: 'createTime',
		render(row) {
			return dayjs(row.createTime).format(
				'YYYY-MM-DD hh:mm:ss'
			)
		},
	},
]
const form = {
	button: [
		{
			type: 'add',
			text: '新增部门',
			form: {
				addUrl: urls.department.save,
				formItem: [
					{
						type: 'input',
						label: '部门名称',
						path: 'departmentName',
						placeholder: '请输入部门名称',
					},
				],
			},
		},
	],
	updateUrl: urls.department.update,
	formItem: [
		{
			type: 'input',
			label: '部门名称',
			path: 'departmentName',
			placeholder: '请输入部门名称',
		},
	],
}
</script>

<style scoped></style>
