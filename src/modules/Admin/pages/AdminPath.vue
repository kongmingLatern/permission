<template>
	<admin-table
		:data="data"
		:columns="createColumns()"
		row-key="id"
		@update-page="updatePage"
	></admin-table>
</template>

<script setup lang="ts">
import { getListByPage, urls } from '@/api'
import AdminTable from '@/modules/Admin/components/AdminTable.vue'
import EditPathForm from '@/modules/Admin/components/path/EditPathForm.vue'
import dayjs from 'dayjs'
import {
	NButton,
	type DataTableColumns,
	NTag,
	useModal,
} from 'naive-ui'
import { h, onMounted, ref } from 'vue'

type RowData = {
	createBy: string
	createTime: Date
	updateBy: string
	updateTime: Date

	ignore: boolean
	path: string
	desc: string
	roleCode: string
	param: string
}

const data = ref<RowData[]>([])
const loading = ref(true)
const modal = useModal()
const createColumns = (): DataTableColumns<RowData> => [
	{
		type: 'selection',
	},
	{
		title: '接口描述',
		key: 'desc',
	},
	{
		title: '接口路径',
		key: 'path',
	},
	{
		title: '是否需要登录',
		key: 'ignore',
		render: row => {
			if (row.ignore) {
				return h(
					NTag,
					{ type: 'primary' },
					{ default: () => '是' }
				)
			} else {
				return h(
					NTag,
					{ type: 'error' },
					{ default: () => '否' }
				)
			}
		},
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
								h(EditPathForm, {
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

async function getData(page = 1, pageSize = 10) {
	loading.value = true
	data.value = await getListByPage(
		urls.path.page,
		page,
		pageSize
	)
	loading.value = false
}

onMounted(async () => {
	await getData()
})

async function updatePage(page) {
	await getData(page)
}
</script>

<style scoped></style>
