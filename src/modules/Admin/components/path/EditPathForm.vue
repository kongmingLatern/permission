<template>
	<n-form
		ref="formRef"
		:label-width="80"
		:model="formValue"
		:rules="rules"
		label-placement="left"
		class="w-350px p-1rem rounded-lg overflow-hidden"
	>
		<n-form-item label="接口路径" path="path">
			<n-input
				v-model:value="formValue.path"
				placeholder="输入接口名称"
			/>
		</n-form-item>

		<n-form-item label="接口描述" path="desc">
			<n-input
				v-model:value="formValue.desc"
				placeholder="输入接口描述"
			/>
		</n-form-item>

		<n-form-item label="是否需要登录" path="ignore">
			<n-radio-group
				v-model:value="formValue.ignore"
				name="radiogroup"
			>
				<n-space>
					<n-radio :value="true"> 是 </n-radio>
					<n-radio :value="false"> 否 </n-radio>
				</n-space>
			</n-radio-group>
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
				rolename: {
					required: true,
					message: '请输入角色名称',
					trigger: 'blur',
				},
			},
			handleValidateClick(e: MouseEvent) {
				e.preventDefault()
				formRef.value?.validate(async errors => {
					if (!errors) {
						try {
							await http.put(
								urls.path.update,
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
