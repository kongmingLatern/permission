<template>
	<admin-table
		:data="data"
		:columns="createColumns()"
		row-key="address"
	></admin-table>
</template>

<script setup lang="ts">
import AdminTable from '@/modules/Admin/components/AdminTable.vue'
import type { DataTableColumns } from 'naive-ui'

type RowData = {
	key: number
	name: string
	age: string
	address: string
}

const createColumns = (): DataTableColumns<RowData> => [
	{
		type: 'selection',
		disabled(row: RowData) {
			return row.name === 'Edward King 3'
		},
	},
	{
		title: 'Name',
		key: 'name',
	},
	{
		title: 'Age',
		key: 'age',
	},
	{
		title: 'Address',
		key: 'address',
	},
]

const data = Array.from({ length: 46 }).map((_, index) => ({
	name: `Edward King ${index}`,
	age: 32,
	address: `London, Park Lane no. ${index}`,
}))
</script>

<style scoped></style>
