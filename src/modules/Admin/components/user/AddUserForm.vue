<template>
	<n-form
		ref="formRef"
		:label-width="80"
		:model="formValue"
		:rules="rules"
		label-placement="left"
		class="w-350px p-1rem rounded-lg overflow-hidden"
	>
		<n-form-item label="用户名" path="username">
			<n-input
				v-model:value="formValue.username"
				placeholder="输入用户名"
			/>
		</n-form-item>
		<n-form-item label="密码" path="password">
			<n-input
				type="password"
				v-model:value="formValue.password"
				placeholder="输入密码"
			/>
		</n-form-item>

		<div style="display: flex; justify-content: flex-end">
			<n-button
				strong
				type="success"
				@click="handleValidateClick"
			>
				确定
			</n-button>
		</div>
	</n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormInst, useMessage } from 'naive-ui'
import { goTo } from '@/utils'

export default defineComponent({
	setup() {
		const formRef = ref<FormInst | null>(null)
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
				formRef.value?.validate(errors => {
					if (!errors) {
						message.success('Valid')
						console.log(formRef.value.model)
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
