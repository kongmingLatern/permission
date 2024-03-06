<template>
	<n-form
		ref="formRef"
		:label-width="80"
		:model="formValue"
		:rules="rules"
		label-placement="left"
		class="w-400px bg-[#7075e0] p-1rem rounded-lg overflow-hidden absolute-center"
	>
		<h1
			text-center
			color-white
			style="letter-spacing: 0.2rem"
		>
			登录
		</h1>
		<n-form-item
			label="用户名"
			path="username"
			label-style="color: white"
		>
			<n-input
				v-model:value="formValue.username"
				placeholder="输入用户名"
			/>
		</n-form-item>
		<n-form-item
			label="密码"
			path="password"
			label-style="color: white"
		>
			<n-input
				type="password"
				v-model:value="formValue.password"
				placeholder="输入密码"
			/>
		</n-form-item>

		<n-form-item color-white pl-1rem>
			<span
				>没有账号？去
				<RouterLink to="/register" color-white font-bold
					>注册</RouterLink
				>
			</span>
		</n-form-item>

		<div style="display: flex; justify-content: flex-end">
			<n-button
				strong
				type="success"
				@click="handleValidateClick"
			>
				登录
			</n-button>
		</div>
	</n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { goTo } from '@/utils'
import { http, urls } from '@/api'
import { useMessage, useNotification } from 'naive-ui'

export default defineComponent({
	setup() {
		window.$message = useMessage()
		window.$notification = useNotification()
		const formRef = ref<any>(null)
		const message = useMessage()
		return {
			formRef,
			formValue: ref({
				username: '',
				password: '',
			}),
			rules: {
				username: {
					required: true,
					message: '请输入用户名',
					trigger: 'blur',
				},
				password: {
					required: true,
					message: '请输入密码',
					trigger: 'blur',
				},
			},
			handleValidateClick(e: MouseEvent) {
				e.preventDefault()
				formRef.value?.validate(async errors => {
					if (!errors) {
						try {
							const res = await http.post(
								urls.common.login,
								formRef.value.model
							)
							localStorage.setItem('token', res.data)
							const r = await http.post(urls.common.menu)
							localStorage.setItem(
								'tenantId',
								r.data.tenantId
							)
							message.success('登录成功')
							goTo('admin')
						} catch (e) {
							console.log(e)
						}
					} else {
						console.log(errors)
						message.error('登录失败')
					}
				})
			},
		}
	},
})
</script>
