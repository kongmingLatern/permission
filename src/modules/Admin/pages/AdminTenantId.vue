<template>
	<admin-layout
		:get-url="urls.tenant.page"
		:columns="columns"
		:form-item="EditTenantForm"
	></admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '@/modules/Admin/layout/AdminLayout.vue'
import EditTenantForm from '@/modules/Admin/components/tenant/EditTenantForm.vue'
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
</script>

<style scoped></style>
