<template>
	<admin-table
		:data="data"
		:columns="createColumns()"
		row-key="id"
	></admin-table>
	<form-modal header="用户管理">
		<n-descriptions
			label-placement="left"
			bordered
			:columns="2"
		>
			<n-descriptions-item label="用户名">
				{{ currentUser.username }}
			</n-descriptions-item>
			<n-descriptions-item label="真实姓名">
				{{ currentUser.realName }}
			</n-descriptions-item>
			<n-descriptions-item label="权限控制" :span="2">
				<AdminTree />
			</n-descriptions-item>
			<n-descriptions-item label="账号状态">
				{{ currentUser.status === 0 ? '冻结' : '正常' }}
			</n-descriptions-item>
		</n-descriptions>
	</form-modal>
</template>

<script setup lang="ts">
import AdminTable from '@/modules/Admin/components/AdminTable.vue'
import AdminTree from '../components/AdminTree.vue'
import FormModal from '@/components/FormModal.vue'
import dayjs from 'dayjs'
import {
	NButton,
	type DataTableColumns,
	NTag,
} from 'naive-ui'
import { h, ref } from 'vue'
import { useFormModal } from '@/composables'

type RowData = {
	username: string
	realName: string
	sex: number
	email: string
	phone: string
	status: number
	loginDate: Date
	modifyDate: Date
	tenantIds: string
}

const { openFormModal } = useFormModal()
const currentUser = ref<RowData>({} as RowData)

const createColumns = (): DataTableColumns<RowData> => [
	{
		type: 'selection',
	},
	{
		title: '用户名',
		key: 'username',
	},
	{
		title: '真实姓名',
		key: 'realName',
	},
	{
		title: '性别',
		key: 'sex',
		render(row) {
			if (row.sex === 1) {
				return '男'
			} else if (row.sex === 2) {
				return '女'
			} else {
				return '未知'
			}
		},
	},
	{
		title: '邮箱',
		key: 'email',
	},
	{
		title: '手机号',
		key: 'phone',
	},
	{
		title: '是否冻结',
		key: 'status',
		render(row) {
			if (row.status === 1) {
				return '正常'
			} else if (row.status === 2) {
				return h(NTag, {}, { default: () => '冻结' })
			} else {
				return `未知状态${row.status}`
			}
		},
	},
	{
		title: '登录日期',
		key: 'loginDate',
		render(row) {
			return dayjs(row.loginDate).format(
				'YYYY-MM-DD hh:mm:ss'
			)
		},
	},
	{
		title: '修改日期',
		key: 'modifyDate',
		render(row) {
			return dayjs(row.modifyDate).format(
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
						openFormModal()
						currentUser.value = row
					},
				},
				{ default: () => 'Play' }
			)
		},
	},
]

const data = Array.from({ length: 46 }).map((_, index) => ({
	id: `${index}`,
	username: `xiaoming${index}`,
	realName: '小明',
	sex: 1,
	email: 'xiaoming123@example.com',
	phone: '13800000000',
	status: 1,
	loginDate: '2024-03-05T09:00:00.000Z',
	modifyDate: '2024-03-05T09:30:00.000Z',
	tenantIds: 'tenant1',
}))
</script>

<style scoped></style>
