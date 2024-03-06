<template>
	<AdminLayout
		:delete-url="urls.role.remove"
		:get-url="urls.role.page"
		:columns="columns"
		:form="form"
	></AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/modules/Admin/layout/AdminLayout.vue'
import Description from '../components/user/Description.vue'
import { http, urls } from '@/api'
import dayjs from 'dayjs'
import { h } from 'vue'
import { useNotification } from 'naive-ui'

const notify = useNotification()

const columns = [
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
]

const form = {
	button: [
		{
			type: 'add',
			text: '新增角色',
			form: {
				addUrl: urls.role.save,
				formItem: [
					{
						type: 'input',
						label: '角色编号',
						path: 'roleCode',
						placeholder: '请输入角色编号',
					},
					{
						type: 'input',
						label: '角色名称',
						path: 'roleName',
						placeholder: '请输入角色名称',
					},
				],
			},
		},
	],
	updateUrl: urls.role.update,
	formItem: [
		{
			type: 'input',
			label: '角色编号',
			path: 'roleCode',
			placeholder: '请输入角色编号',
		},
		{
			type: 'input',
			label: '角色名称',
			path: 'roleName',
			placeholder: '请输入角色名称',
		},
	],
	actionCfg: {
		button: [
			{
				type: 'post',
				title: '菜单授权',
				showComponent: (row, cb) =>
					h(Description, {
						current: row,
						onConfirm: async data => {
							try {
								await http.post(
									urls.role.authorizedPermission,
									{
										roleCode: row.roleCode,
										permissionIds: data,
									}
								)

								await cb()
							} catch {
								notify.error({
									meta: '错误信息',
									content: '授权失败',
									duration: 2500,
								})
							}
						},
					}),
			},
		],
	},
}
</script>

<style scoped></style>
<!-- <template>
	<n-flex justify="end" class="p-2">
		<n-button type="primary" @click="handleClick"
			>创建角色</n-button
		>
	</n-flex>
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
					:data="[]"
					@update="updateTree"
				></admin-tree>
			</n-descriptions-item>
		</n-descriptions>
	</FormModal>
</template>

<script setup lang="ts">
import AdminTable from '@/modules/Admin/components/AdminTable.vue'
import AdminTree from '../components/AdminTree.vue'
import AddRoleForm from '@/modules/Admin/components/role/AddRoleForm.vue'
import FormModal from '@/components/FormModal.vue'
import dayjs from 'dayjs'
import {
	NButton,
	type DataTableColumns,
	NFlex,
	useModal,
} from 'naive-ui'
import { h, ref } from 'vue'
import { useFormModal } from '@/composables'
import { onMounted } from 'vue'
import { http, urls } from '@/api'

type RowData = {
	id: string
	createBy: string
	createTime: Date
	updateBy: string
	updateTime: Date
	roleName: string
	roleCode: string
}

const currentUser = ref<RowData>({} as RowData)
const treeData = ref()
const data = ref<RowData[]>([])
const json = ref([])
const { openFormModal, closeFormModal } = useFormModal()
const modal = useModal()

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
				NFlex,
				{},
				{
					default: () => [
						h(
							NButton,
							{
								strong: true,
								tertiary: true,
								size: 'small',
								type: 'primary',
								onClick: async () => {
									currentUser.value = row
									openFormModal()
									const res = await http.get(
										urls.permission.queryById,
										{ params: { id: currentUser.value.id } }
									)
									// TODO:
									console.log(res)
								},
							},
							{ default: () => '查看信息' }
						),
						h(
							NButton,
							{
								strong: true,
								tertiary: true,
								size: 'small',
								type: 'warning',
								onClick: async () => {
									currentUser.value = row
									openFormModal()
									// TODO:
								},
							},
							{ default: () => '分配权限' }
						),
					],
				}
			)
		},
	},
]

onMounted(async () => {
	data.value = (
		(await http.get(urls.role.page)) as any
	).records
})

function updateTree(key, options, meta) {
	treeData.value = key
	console.log('updateTree', key, options, meta)
	return
}
function handleConfirm() {
	console.log(treeData.value, currentUser.value)
}
function handleClick() {
	const modalInst = modal.create({
		title: '创建角色',
		transformOrigin: 'center',
		content: () => h(AddRoleForm),
		preset: 'dialog',
	})
	console.log(modalInst)
}
</script>

<style scoped></style> -->
