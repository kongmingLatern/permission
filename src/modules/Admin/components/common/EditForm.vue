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
					:value="getNestedValue(formValue, item.path)"
					:on-update:value="
						e => setNestedValue(formValue, item.path, e)
					"
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
				<!-- <n-input
					v-model:value="formValue[item.path]"
					:placeholder="item.placeholder"
				/> -->
				<n-input
					:value="getNestedValue(formValue, item.path)"
					:on-update:value="
						e => setNestedValue(formValue, item.path, e)
					"
					:placeholder="item.placeholder"
				/>
			</template>

			<template v-else-if="item.type === 'select'">
				<n-select
					:value="getNestedValue(formValue, item.path)"
					:on-update:value="
						e => setNestedValue(formValue, item.path, e)
					"
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
import { defineComponent, ref, watch } from 'vue'
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

		function getNestedValue(obj, path) {
			const pathArray = path.split('.')
			let value = obj

			for (const pathSegment of pathArray) {
				if (
					value &&
					typeof value === 'object' &&
					pathSegment in value
				) {
					value = value[pathSegment]
				} else {
					value = undefined
					break
				}
			}

			return value
		}

		// 设置嵌套路径的新值
		function setNestedValue(obj, path, newValue) {
			const pathArray = path.split('.')
			let currentObj = obj

			for (let i = 0; i < pathArray.length - 1; i++) {
				const pathSegment = pathArray[i]

				if (!(pathSegment in currentObj)) {
					// 如果路径不存在，创建空对象
					currentObj[pathSegment] = {}
				}

				currentObj = currentObj[pathSegment]
			}

			// 设置最终路径的新值
			currentObj[pathArray[pathArray.length - 1]] = newValue
		}

		watch(formValue, () => {
			formRef.value?.resetValidation()
		})

		return {
			formRef,
			formValue,
			getNestedValue,
			setNestedValue,
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
