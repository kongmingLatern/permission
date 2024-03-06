<template>
	<admin-layout
		:get-url="urls.tenant.page"
		:delete-url="urls.tenant.remove"
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
		title: '租户Id',
		key: 'tenantId',
	},
	{
		title: '租户名称',
		key: 'tenantName',
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
			text: '新增租户',
			form: {
				addUrl: urls.tenant.save,
				formItem: [
					{
						type: 'input',
						label: '租户名称',
						path: 'tenantName',
						placeholder: '请输入租户名称',
					},
				],
			},
		},
	],
	updateUrl: urls.tenant.update,
	formItem: [
		{
			type: 'input',
			label: '租户名称',
			path: 'tenantName',
			placeholder: '请输入租户名称',
		},
	],
}
</script>

<style scoped></style>
