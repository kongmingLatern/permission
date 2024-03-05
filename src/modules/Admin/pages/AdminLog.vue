<template>
	<admin-layout
		:get-url="urls.log.page"
		:columns="columns"
		:hasAction="false"
	></admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '@/modules/Admin/layout/AdminLayout.vue'
import { urls } from '@/api'
import dayjs from 'dayjs'
import { h } from 'vue'
import { NTag } from 'naive-ui'
const columns = [
	{
		title: '日志内容',
		key: 'logContent',
	},
	{
		title: '日志类型',
		key: 'logType',
		render: row => {
			if (row.logType === 1) {
				return h(NTag, {}, { default: () => '登录日志' })
			} else if (row.logType === 2) {
				return h(NTag, {}, { default: () => '操作日志' })
			} else {
				return h(
					NTag,
					{ type: 'error' },
					{ default: () => '未知日志' }
				)
			}
		},
	},
	{
		title: '操作用户',
		key: 'username',
	},
	{
		title: 'ip地址',
		key: 'ip',
	},
	{
		title: '请求地址',
		key: 'requestUrl',
	},
	{
		title: '请求方式',
		key: 'requestType',
		render: row => {
			return h(
				NTag,
				{
					type: 'info',
				},
				{
					default: () => row.requestType,
				}
			)
		},
	},
	{
		title: '请求参数',
		key: 'requestParam',
	},
	{
		title: '花费时间',
		key: 'costTime',
		render: row => {
			return row.costTime / 1000 + 's'
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
</script>

<style scoped></style>
