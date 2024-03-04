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
			注册
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

		<n-form-item
			ref="rPasswordFormItemRef"
			first
			path="reenteredPassword"
			label="重复密码"
			label-style="color: white"
		>
			<n-input
				v-model:value="formValue.reenteredPassword"
				:disabled="!formValue.password"
				type="password"
				@keydown.enter.prevent
				placeholder="重复密码"
			/>
		</n-form-item>

		<n-form-item color-white pl-1rem>
			<span
				>已有账号？去
				<RouterLink to="/login" color-white font-bold
					>登录</RouterLink
				>
			</span>
		</n-form-item>

		<div style="display: flex; justify-content: flex-end">
			<n-button
				strong
				type="success"
				@click="handleValidateClick"
			>
				注册
			</n-button>
		</div>
	</n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
	FormInst,
	FormItemRule,
	useMessage,
} from 'naive-ui'

export default defineComponent({
	setup() {
		const formRef = ref<FormInst | null>(null)
		const message = useMessage()
		const formValue = ref({
			username: '',
			password: '',
			reenteredPassword: '',
		})
		function validatePasswordStartWith(
			_: FormItemRule,
			value: string
		): boolean {
			return (
				!!formValue.value.password &&
				formValue.value.password.startsWith(value) &&
				formValue.value.password.length >= value.length
			)
		}
		function validatePasswordSame(
			_: FormItemRule,
			value: string
		): boolean {
			return value === formValue.value.password
		}
		return {
			formRef,
			formValue,
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
				reenteredPassword: [
					{
						required: true,
						message: '请再次输入密码',
						trigger: ['input', 'blur'],
					},
					{
						validator: validatePasswordStartWith,
						message: '两次密码输入不一致',
						trigger: 'input',
					},
					{
						validator: validatePasswordSame,
						message: '两次密码输入不一致',
						trigger: ['blur', 'password-input'],
					},
				],
			},
			handleValidateClick(e: MouseEvent) {
				e.preventDefault()
				formRef.value?.validate(errors => {
					if (!errors) {
						message.success('Valid')
					} else {
						console.log(errors)
						message.error('Invalid')
					}
				})
			},
		}
	},
})
</script>
