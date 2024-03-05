<template>
	<admin-table
		:data="data"
		:columns="createColumns()"
		:loading="loading"
		row-key="id"
		@update-page="updatePage"
	></admin-table>
</template>

<script setup lang="ts">
import { getListByPage } from '@/api'
import AdminTable from '@/modules/Admin/components/AdminTable.vue'
import {
	NButton,
	type DataTableColumns,
	useModal,
} from 'naive-ui'
import { h, onMounted, ref } from 'vue'

const modal = useModal()

const props = defineProps([
	'columns',
	'getUrl',
	'formItem',
	'hasAction',
])

const basicColumns = [
	{
		type: 'selection',
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
						modal.create({
							title: '编辑',
							content: () =>
								h(props.formItem, {
									formItem: row,
									onReload: async () => {
										await getData()
										modal.destroyAll()
									},
								}),
							preset: 'dialog',
						})
					},
				},
				{ default: () => '编辑' }
			)
		},
	},
]

const createColumns = (): DataTableColumns => [
	basicColumns[0],
	...props.columns,
	props.hasAction ?? basicColumns[1],
	...props.columns.filter(i => i.key === 'actions'),
]
const data = ref([])
const loading = ref(false)

async function getData(page = 1, pageSize = 10) {
	loading.value = true
	data.value = await getListByPage(
		props.getUrl,
		page,
		pageSize
	)
	loading.value = false
}

onMounted(async () => {
	await getData()
})
async function updatePage(page: number) {
	await getData(page)
}
</script>

<style scoped></style>
