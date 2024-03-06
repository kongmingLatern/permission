<template>
	<admin-table
		:data="data"
		:columns="createColumns().filter(Boolean)"
		:loading="loading"
		row-key="id"
	></admin-table>
</template>

<script setup lang="ts">
import { getList } from '@/api'
import AdminTable from '@/modules/Admin/components/AdminTable.vue'
import EditForm from '@/modules/Admin/components/common/EditForm.vue'
import {
	NButton,
	type DataTableColumns,
	useModal,
} from 'naive-ui'
import { h, onMounted, ref } from 'vue'

const modal = useModal()

const props = defineProps([
	'form',
	'columns',
	'getUrl',
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
								h(EditForm, {
									form: props.form,
									updateUrl: props.form.updateUrl,
									data: row,
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
	props.hasAction ??
		props.columns.filter(i => i.key === 'actions')[0],
]

const data = ref([])
const loading = ref(false)

async function getData() {
	data.value = []
	loading.value = true
	data.value = await getList(props.getUrl)
	loading.value = false
}

onMounted(async () => {
	await getData()
})
</script>

<style scoped></style>
