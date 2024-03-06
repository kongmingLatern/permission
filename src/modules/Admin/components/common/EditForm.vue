<template>
	<n-form
		ref="formRef"
		:label-width="120"
		:model="formValue"
		:rules="rules"
		label-placement="left"
		class="w-350px p-1rem rounded-lg overflow-hidden"
	>
		<n-form-item
			v-for="(item, index) in $props.form.formItem"
			:key="index"
			:label="item.label"
			:path="item.path"
		>
			<template v-if="item.type === 'radio'">
				<n-radio-group
					v-model:value="formValue[item.path]"
					name="radiogroup"
				>
					<n-space>
						<n-radio
							v-for="r in item.options"
							:key="r"
							:value="r.value"
							>{{ r.label }}
						</n-radio>
					</n-space>
				</n-radio-group>
			</template>

			<template v-else-if="item.type === 'input'">
				<n-input
					v-model:value="formValue[item.path]"
					:placeholder="item.placeholder"
				/>
			</template>

			<template v-else-if="item.type === 'select'">
				<n-select
					v-model:value="formValue[item.path]"
					:multiple="item.multiple"
					:options="item.options"
					:placeholder="item.placeholder"
				/>
			</template>
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
import {
	defineComponent,
	onBeforeUnmount,
	ref,
	watch,
} from 'vue'
import { useMessage } from 'naive-ui'
import { http } from '@/api'

export default defineComponent({
	props: ['type', 'url', 'form', 'data'],
	setup(props, { emit }) {
		const formRef = ref<any>(null)
		const message = useMessage()
		const formValue = ref({ ...props.data })

		function transformInterfaceDefinition(
			originalDefinitions
		) {
			const transformedDefinitions = {}

			// NOTE: 这里之后可以为表单添加校验规则属性
			originalDefinitions.forEach(def => {
				const {
					path,
					placeholder,
					shouldCheck = true,
				} = def
				if (shouldCheck) {
					const key = path // 这里假设path值在新旧格式中都用作key
					transformedDefinitions[key] = {
						required: true, // 根据要求设置为true
						message: `${placeholder}`, // placeholder转换成message
						trigger: 'blur', // 固定触发条件为'blur'
					}
				}
			})

			return transformedDefinitions
		}

		console.log(formValue.value)

		// function getValueByPath(obj, path, value = '') {
		// 	const parts = path.split('.')
		// 	let current = obj

		// 	parts.forEach((part, index) => {
		// 		if (index === parts.length - 1) {
		// 			current[part] = value // 设置最后一个属性的值为 ''
		// 		} else {
		// 			current[part] = current[part] || {} // 如果当前属性不存在，则创建一个空对象
		// 			current = current[part] // 移到下一个层级
		// 		}
		// 	})

		// 	return obj
		// }
		// props.form.formItem.forEach(item => {
		// 	let initialValue = getValueByPath(
		// 		formValue.value,
		// 		item.path
		// 	)

		// 	// 初始化路径值
		// 	setValueByPath(
		// 		formValue.value,
		// 		item.path,
		// 		initialValue
		// 	)

		// 	// 监听变化并更新
		// 	const unwatch = watch(
		// 		() => getValueByPath(formValue.value, item.path),
		// 		newVal => {
		// 			setValueByPath(formValue.value, item.path, newVal)
		// 		}
		// 	)

		// 	// 清理
		// 	onBeforeUnmount(() => {
		// 		unwatch()
		// 	})
		// })

		// // Helper functions (之前已给出的getValueByPath和一个新的setValueByPath)
		// function setValueByPath(obj, path, value) {
		// 	const keys = path.split('.')
		// 	const lastKey = keys.pop()
		// 	const lastObj = keys.reduce((obj, key) => {
		// 		if (!obj[key]) obj[key] = {} // 确保每个中间层都存在
		// 		return obj[key]
		// 	}, obj)
		// 	lastObj[lastKey] = value
		// }

		return {
			formRef,
			formValue,
			rules: transformInterfaceDefinition(
				props.form.formItem
			),
			handleValidateClick(e: MouseEvent) {
				e.preventDefault()
				formRef.value?.validate(async errors => {
					console.log(formRef.value)
					if (!errors) {
						try {
							await http[props.type || 'put'](
								props.url,
								formRef.value!.model
							)
							message.success('更新成功')
							emit('reload')
						} catch {
							message.success('更新失败')
						}
					} else {
						message.error('校验失败')
					}
				})
			},
		}
	},
})
</script>
