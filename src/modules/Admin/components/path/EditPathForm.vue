<template>
	<edit-form
		:form="form"
		:data="props.formItem"
		:update-url="urls.path.update"
	></edit-form>
</template>

<script setup lang="ts">
import EditForm from '@/modules/Admin/components/common/EditForm.vue'
import { urls } from '@/api'

const props = defineProps(['formItem'])

const form = {
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
	],
}
</script>

<style scoped></style>
<!-- <template>
	<n-form
		ref="formRef"
		:label-width="120"
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
		console.log('formItem', props.formItem)
		return {
			formRef,
			formValue: ref(props.formItem),
			rules: {
				path: {
					required: true,
					message: '请输入路径名称',
					trigger: 'blur',
				},
				desc: {
					required: true,
					message: '请输入路径描述',
					trigger: 'blur',
				},
				ignore: {
					required: true,
					message: '请选择是否需要登录',
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
</script> -->
