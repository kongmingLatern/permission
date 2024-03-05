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
import { NButton, type DataTableColumns } from 'naive-ui'
import { h } from 'vue'

type RowData = {
	createBy: string
	createTime: Date
	updateBy: string
	updateTime: Date
	roleName: string
	roleCode: string
}

const createColumns = (): DataTableColumns<RowData> => [
	{
		type: 'selection',
	},
	{
		title: '角色编号',
		key: 'roleCode',
	},
	{
		title: '角色名称',
		key: 'roleName',
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
	createBy: `admin${index}`,
	createTime: '2024-02-28T14:00:00.000Z',
	updateBy: 'xiaoming123',
	updateTime: '2024-03-05T09:30:00.000Z',
	roleName: '系统管理员',
	roleCode: 'SYS_ADMIN',
}))
</script>

<style scoped></style>
