<template>
	<n-data-table
		:columns="
			props.columns.map((i: any) => {
				return { ...i, align: 'center' }
			})
		"
		:loading="props.loading"
		:data="props.data"
		:pagination="props.pagination"
		remote
		:row-key="row => handleRowKey(row)"
		@update:checked-row-keys="handleCheck"
		@update:page="handleChangePage"
	/>
</template>

<script lang="ts" setup>
// TODO: 总页数问题
import { DataTableRowKey } from 'naive-ui'
import { RowData } from 'naive-ui/es/data-table/src/interface'
import { ref } from 'vue'
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const props = defineProps([
	'columns',
	'data',
	'rowKey',
	'loading',
	'pagination',
])

const emits = defineEmits(['updatePage'])

function handleCheck(rowKeys: DataTableRowKey[]) {
	checkedRowKeysRef.value = rowKeys
}

function handleChangePage(page: number) {
	emits('updatePage', page)
}

function handleRowKey(row: RowData) {
	return row[props.rowKey]
}
</script>
