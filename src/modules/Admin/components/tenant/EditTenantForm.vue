<template>
	<n-form
		ref="formRef"
		:label-width="80"
		:model="formValue"
		:rules="rules"
		label-placement="left"
		class="w-350px p-1rem rounded-lg overflow-hidden"
	>
		<n-form-item label="租户名称" path="tenantName">
			<n-input
				v-model:value="formValue.tenantName"
				placeholder="输入租户名称"
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
import { useMessage } from 'naive-ui'
import { http, urls } from '@/api'

export default defineComponent({
	props: ['formItem'],
	setup(props, { emit }) {
		const formRef = ref<any>(null)
		const message = useMessage()
		return {
			formRef,
			formValue: ref(props.formItem),
			rules: {
				tenantName: {
					required: true,
					message: '请输入租户名称',
					trigger: 'blur',
				},
			},
			handleValidateClick(e: MouseEvent) {
				e.preventDefault()
				formRef.value?.validate(async errors => {
					if (!errors) {
						try {
							await http.put(
								urls.tenant.update,
								formRef.value!.model
							)
							message.success('更新成功')
							emit('reload')
						} catch {
							message.success('更新失败')
						}
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
