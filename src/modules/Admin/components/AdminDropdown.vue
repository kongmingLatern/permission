<template>
	<n-dropdown :options="options" :show-arrow="true">
		<n-flex align="center" size="small">
			<n-icon size="32" :component="UserIcon" />
			<span>用户名</span>
		</n-flex>
	</n-dropdown>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
	PersonCircleOutline as UserIcon,
	Pencil as EditIcon,
	LogOutOutline as LogoutIcon,
} from '@vicons/ionicons5'
const renderIcon = (icon: Component) => {
	return () => {
		return h(NIcon, null, {
			default: () => h(icon),
		})
	}
}

export default defineComponent({
	setup() {
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
		}
	},
})
</script>
