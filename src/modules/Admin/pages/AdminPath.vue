<template>
	<admin-layout
		:get-url="urls.path.page"
		:columns="columns"
		:form="form"
	></admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '@/modules/Admin/layout/AdminLayout.vue'
import { getList, urls } from '@/api'
import dayjs from 'dayjs'
import { h, ref } from 'vue'
import { NTag } from 'naive-ui'
const data = ref([])
;(async function () {
	data.value = (await getList(urls.role.list)).map(
		(i: any) => {
			return {
				label: i.roleName,
				value: i.roleCode,
			}
		}
	)
})()
const columns = [
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
]

const form = ref({
	updateUrl: urls.path.update,
	formItem: [
		{
			type: 'input',
			label: '接口路径',
			path: 'path',
			placeholder: '请输入接口路径',
		},
		{
			type: 'input',
			label: '接口描述',
			path: 'desc',
			placeholder: '请输入接口描述',
		},
		{
			type: 'radio',
			label: '是否需要登录',
			path: 'ignore',
			placeholder: '请选择是否需要登录',
			shouldCheck: false,
			options: [
				{
					value: true,
					label: '是',
				},
				{
					value: false,
					label: '否',
				},
			],
		},
		{
			type: 'select',
			label: '权限分配',
			path: 'roleCodes',
			placeholder: '请选择要分配的角色',
			shouldCheck: false,
			multiple: true,
			options: data,
		},
	],
})
</script>

<style scoped></style>
