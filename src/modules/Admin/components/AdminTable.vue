<template>
	<n-data-table
		:columns="
			props.columns.map((i: any) => {
				return { ...i, align: 'center' }
			})
		"
		:data="props.data"
		:pagination="{
			pageSize: 20,
		}"
		:row-key="row => handleRowKey(row)"
		@update:checked-row-keys="handleCheck"
	/>
</template>

<script lang="ts" setup>
import { DataTableRowKey } from 'naive-ui'
import { RowData } from 'naive-ui/es/data-table/src/interface'
import { ref } from 'vue'
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const props = defineProps(['columns', 'data', 'rowKey'])

function handleCheck(rowKeys: DataTableRowKey[]) {
	checkedRowKeysRef.value = rowKeys
}

function handleRowKey(row: RowData) {
	return row[props.rowKey]
}
</script>
