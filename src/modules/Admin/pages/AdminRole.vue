<template>
	<admin-table
		:data="data"
		:columns="createColumns()"
		row-key="id"
	></admin-table>
	<FormModal header="角色管理" @confirm="handleConfirm">
		<n-descriptions
			label-placement="left"
			bordered
			:columns="2"
		>
			<n-descriptions-item label="角色编号">
				{{ currentUser.roleCode }}
			</n-descriptions-item>
			<n-descriptions-item label="角色名称">
				{{ currentUser.roleName }}
			</n-descriptions-item>
			<n-descriptions-item label="菜单权限控制" :span="2">
				<admin-tree
					:data="demoJSON"
					@update="updateTree"
				></admin-tree>
			</n-descriptions-item>
		</n-descriptions>
	</FormModal>
</template>

<script setup lang="ts">
import AdminTable from '@/modules/Admin/components/AdminTable.vue'
import AdminTree from '../components/AdminTree.vue'
import FormModal from '@/components/FormModal.vue'
import dayjs from 'dayjs'
import demoJSON from '../components/demo.json'
import { NButton, type DataTableColumns } from 'naive-ui'
import { h, ref } from 'vue'
import { useFormModal } from '@/composables'

type RowData = {
	createBy: string
	createTime: Date
	updateBy: string
	updateTime: Date
	roleName: string
	roleCode: string
}

const currentUser = ref<RowData>({} as RowData)
const treeData = ref()
const { openFormModal } = useFormModal()

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
					type: 'primary',
					onClick: () => {
						currentUser.value = row
						openFormModal()
					},
				},
				{ default: () => '查看信息' }
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

function updateTree(key, options, meta) {
	treeData.value = key
	console.log('updateTree', key, options, meta)
	return
}
function handleConfirm() {
	console.log(treeData.value)
}
</script>

<style scoped></style>
