<template>
	<AdminLayout
		:delete-url="urls.user.remove"
		:get-url="urls.user.page"
		:columns="columns"
		:form="form"
		row-key="unquireId"
	></AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/modules/Admin/layout/AdminLayout.vue'
import { getList, urls } from '@/api'
import dayjs from 'dayjs'
import { h, ref } from 'vue'
import { NTag } from 'naive-ui'
// TODO: 菜单编辑表单未做

function helpers(data, labelKey, valueKey) {
	console.log(data)
	return data.map(i => {
		return {
			label: i[labelKey],
			value: i[valueKey],
		}
	})
}

const departmentList = ref([])
const roleList = ref([])
const tenantList = ref([])
;(async function () {
	departmentList.value = helpers(
		await getList(urls.department.list),
		'departmentName',
		'id'
	)
	roleList.value = helpers(
		await getList(urls.role.list),
		'roleName',
		'id'
	)
	tenantList.value = helpers(
		await getList(urls.tenant.list),
		'tenantName',
		'id'
	)
})()

const columns = [
	{
		title: '用户名',
		key: 'username',
		render: row => row.sysUser.username,
	},
	{
		title: '真实姓名',
		key: 'realname',
		render: row => row.sysUser.realname,
	},
	{
		title: '角色名称',
		key: 'roleName',
	},
	{
		title: '所属部门',
		key: 'departmentName',
	},
	{
		title: '性别',
		key: 'sex',
		render(row) {
			if (row.sysUser.sex === 1) {
				return '男'
			} else if (row.sysUser.sex === 2) {
				return '女'
			} else {
				return '未知'
			}
		},
	},
	{
		title: '邮箱',
		key: 'email',
		render(row) {
			return row.sysUser.email
		},
	},
	{
		title: '手机号',
		key: 'phone',
		render(row) {
			return row.sysUser.phone
		},
	},
	{
		title: '是否冻结',
		key: 'status',
		render(row) {
			if (row.sysUser.status === 1) {
				return '正常'
			} else if (row.sysUser.status === 2) {
				return h(NTag, {}, { default: () => '冻结' })
			} else {
				return `未知状态${row.sysUser.status}`
			}
		},
	},
	{
		title: '登录日期',
		key: 'loginDate',
		render(row) {
			return dayjs(row.sysUser.loginDate).format(
				'YYYY-MM-DD hh:mm:ss'
			)
		},
	},
	{
		title: '修改日期',
		key: 'modifyDate',
		render(row) {
			return dayjs(row.sysUser.modifyDate).format(
				'YYYY-MM-DD hh:mm:ss'
			)
		},
	},
]

const form = ref({
	button: [
		{
			type: 'put',
			text: '新增人员',
			form: {
				addUrl: urls.user.addUser,
				formItem: [
					{
						type: 'input',
						label: '用户名',
						path: 'sysUser.username',
						placeholder: '请输入用户名',
					},
					{
						type: 'input',
						label: '真实姓名',
						path: 'sysUser.realname',
						placeholder: '请输入真实姓名',
					},
					{
						type: 'select',
						label: '性别',
						path: 'sex',
						placeholder: '请选择性别',
						shouldCheck: false,
						options: [
							{
								label: '男',
								value: 1,
							},
							{
								label: '女',
								value: 2,
							},
						],
					},
					{
						type: 'input',
						label: '邮箱',
						path: 'email',
						placeholder: '请输入邮箱',
					},
					{
						type: 'input',
						label: '手机号',
						path: 'phone',
						placeholder: '请输入手机号',
					},
					{
						type: 'select',
						label: '部门选择',
						path: 'department',
						placeholder: '请选择部门',
						options: departmentList,
					},
					{
						type: 'select',
						label: '角色选择',
						path: 'roleCode',
						placeholder: '请选择角色',
						options: roleList,
					},
					{
						type: 'select',
						label: '租户选择',
						path: 'tenantId',
						placeholder: '请选择租户',
						options: tenantList,
					},
					{
						type: 'select',
						label: '是否冻结',
						path: 'status',
						placeholder: '请选择是否冻结',
						shouldCheck: false,
						options: [
							{
								label: '是',
								value: 1,
							},
							{
								label: '否',
								value: 0,
							},
						],
					},
				],
			},
		},
	],
	updateUrl: urls.permission.update,
	formItem: [
		{
			type: 'input',
			label: '用户名',
			path: 'username',
			placeholder: '请输入用户名',
		},
		{
			type: 'input',
			label: '真实姓名',
			path: 'realname',
			placeholder: '请输入真实姓名',
		},
		{
			type: 'select',
			label: '性别',
			path: 'sex',
			placeholder: '请选择性别',
			shouldCheck: false,
			options: [
				{
					label: '男',
					value: 1,
				},
				{
					label: '女',
					value: 2,
				},
			],
		},
		{
			type: 'input',
			label: '邮箱',
			path: 'email',
			placeholder: '请输入邮箱',
		},
		{
			type: 'select',
			label: '是否冻结',
			path: 'status',
			placeholder: '请选择是否冻结',
			shouldCheck: false,
			options: [
				{
					label: '是',
					value: 1,
				},
				{
					label: '否',
					value: 0,
				},
			],
		},
	],
})
</script>

<style scoped></style>
<!-- <template>
	<n-flex justify="end" class="p-2">
		<n-button type="primary" @click="handleClick"
			>创建用户</n-button
		>
	</n-flex>
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
				{{ currentUser.realname }}
			</n-descriptions-item>
			<n-descriptions-item label="权限控制" :span="2">
				<AdminTree :data="demoJSON" />
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
import { http, urls } from '@/api'
import demoJSON from '../components/demo.json'
import dayjs from 'dayjs'
import AddUserForm from '@/modules/Admin/components/user/AddUserForm.vue'
import {
	NButton,
	type DataTableColumns,
	NTag,
	NFlex,
	useModal,
} from 'naive-ui'
import { h, onMounted, ref } from 'vue'
import { useFormModal } from '@/composables'

type RowData = {
	username: string
	realname: string
	sex: number
	email: string
	phone: string
	status: number
	loginDate: Date
	modifyDate: Date
	tenantIds: string
}

const { openFormModal } = useFormModal()
const modal = useModal()
const currentUser = ref<RowData>({} as RowData)
const data = ref<RowData[]>([])

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
		key: 'realname',
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
				NFlex,
				{},
				{
					default: () => {
						return [
							h(
								NButton,
								{
									strong: true,
									tertiary: true,
									size: 'small',
									type: 'info',
									onClick: () => {
										openFormModal()
										currentUser.value = row
									},
								},
								{ default: () => '查看信息' }
							),
							h(
								NButton,
								{
									strong: true,
									size: 'small',
									type: 'success',
									onClick: () => {
										openFormModal()
										currentUser.value = row
									},
								},
								{ default: () => '权限分配' }
							),
						]
					},
				}
			)
		},
	},
]

onMounted(async () => {
	data.value = (
		(await http.get(urls.user.page)) as any
	).records
	console.log(data.value)
})

const handleClick = () => {
	const modalInst = modal.create({
		title: '创建用户',
		transformOrigin: 'center',
		content: () => h(AddUserForm),
		preset: 'dialog',
	})
	console.log(modalInst)
}
</script>

<style scoped></style> -->
