<template>
	<n-form
		ref="formRef"
		:label-width="80"
		:model="formValue"
		:rules="rules"
		label-placement="left"
		class="w-350px p-1rem rounded-lg overflow-hidden"
	>
		<n-form-item label="角色" path="rolename">
			<n-input
				v-model:value="formValue.rolename"
				placeholder="输入角色名称"
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

export default defineComponent({
	setup() {
		const formRef = ref<FormInst | null>(null)
		const message = useMessage()
		return {
			formRef,
			formValue: ref({
				rolename: '',
			}),
			rules: {
				rolename: {
					required: true,
					message: '请输入角色名称',
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
