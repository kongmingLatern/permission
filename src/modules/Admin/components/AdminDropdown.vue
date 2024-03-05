<template>
	<n-dropdown
		:options="options"
		:show-arrow="true"
		@select="handleSelect"
	>
		<n-flex align="center" size="small">
			<n-icon size="32" :component="UserIcon" />
			<span>用户名</span>
		</n-flex>
	</n-dropdown>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import type { Component } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import {
	PersonCircleOutline as UserIcon,
	Pencil as EditIcon,
	LogOutOutline as LogoutIcon,
} from '@vicons/ionicons5'
import { http, urls } from '@/api'
import { goTo } from '@/utils'
const renderIcon = (icon: Component) => {
	return () => {
		return h(NIcon, null, {
			default: () => h(icon),
		})
	}
}

export default defineComponent({
	setup() {
		const message = useMessage()
		return {
			UserIcon,
			options: [
				{
					label: '用户资料',
					key: 'profile',
					icon: renderIcon(UserIcon),
				},
				{
					label: '编辑用户资料',
					key: 'editProfile',
					icon: renderIcon(EditIcon),
				},
				{
					label: '退出登录',
					key: 'logout',
					icon: renderIcon(LogoutIcon),
				},
			],
			handleSelect: async key => {
				if (key === 'logout') {
					//退出登录
					try {
						await http.post(urls.common.loginOut)
						localStorage.clear()
						message.success('已退出登录！')
						goTo('login')
					} catch (e) {
						message.error('异常错误！')
					}
				}
			},
		}
	},
})
</script>
