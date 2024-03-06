<template>
	<n-flex justify="end" p-2>
		<n-button
			v-for="(item, index) in $props.form?.button"
			:key="index"
			type="primary"
			@click="handleClick(item)"
		>
			{{ item.text }}
		</n-button>
	</n-flex>
	<admin-table
		:data="data"
		:columns="createColumns().filter(Boolean)"
		:loading="loading"
		:pagination="pagination"
		row-key="id"
		@update-page="updatePage"
	></admin-table>
</template>

<script setup lang="ts">
import { getList, getListByPage, http } from '@/api'
import AdminTable from '@/modules/Admin/components/AdminTable.vue'
import EditForm from '@/modules/Admin/components/common/EditForm.vue'
import {
	NButton,
	type DataTableColumns,
	useModal,
	NSpace,
	NPopconfirm,
	useMessage,
} from 'naive-ui'
import { h, onMounted, ref } from 'vue'

const modal = useModal()
const message = useMessage()

const props = defineProps([
	'isPageQuery',
	'form',
	'columns',
	'getUrl',
	'deleteUrl',
	'hasAction',
])

const pagination = ref({
	defaultPage: 1,
	pageCount: 1,
	pageSize: 20,
})

const basicColumns = [
	{
		type: 'selection',
	},
	{
		title: '操作',
		key: 'actions',
		width: 150,
		render(row) {
			return h(
				NSpace,
				{
					justify: 'center',
				},
				{
					default: () => {
						return [
							h(
								NButton,
								{
									type: 'info',
									size: 'small',
									onClick: () => {
										modal.create({
											title: '编辑',
											content: () =>
												h(EditForm, {
													form: props.form,
													url: props.form.updateUrl,
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
							),
							h(
								NPopconfirm,
								{
									strong: true,
									tertiary: true,
									type: 'error',
									size: 'small',
									positiveText: '确认',
									negativeText: '取消',
									async onPositiveClick() {
										await http.delete(props.deleteUrl, {
											params: {
												id: row.id,
											},
										})
										message.success('删除成功')
										await getData()
									},
								},
								{
									default: () => '确定要删除吗？',
									trigger: () =>
										h(
											NButton,
											{
												type: 'error',
												size: 'small',
											},
											{ default: () => '删除' }
										),
								}
							),
						]
					},
				}
			)
		},
	},
]

const hasAction = ref(props.hasAction ?? true)
const isPageQuery = ref(props.isPageQuery ?? true)
const data = ref([])
const loading = ref(false)

const createColumns = (): DataTableColumns => [
	basicColumns[0],
	...props.columns,
	hasAction.value
		? props.columns.filter(i => i.key === 'actions')
				.length > 0
			? props.columns.filter(i => i.key === 'actions')[0]
			: basicColumns[1]
		: null,
]

async function getData(page = 1, pageSize = 10) {
	data.value = []
	loading.value = true
	if (isPageQuery.value) {
		const { records, totalPage } = await getListByPage(
			props.getUrl,
			page,
			pageSize
		)
		pagination.value.pageCount = totalPage
		data.value = records
		loading.value = false
	} else {
		data.value = await getList(props.getUrl)
		loading.value = false
	}
}

onMounted(async () => {
	await getData()
})
async function updatePage(page: number) {
	await getData(page)
}

function handleAdd(item) {
	modal.create({
		title: '新增',
		content: () =>
			h(EditForm, {
				form: item.form,
				type: 'post',
				url: item.form.addUrl,
				onReload: async () => {
					await getData()
					modal.destroyAll()
				},
			}),
		preset: 'dialog',
	})
}

function handleClick(item) {
	if (item.type === 'add') {
		// NOTE: 新增
		handleAdd(item)
	}
}
</script>

<style scoped></style>
