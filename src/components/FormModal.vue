<template>
	<n-modal
		v-model:show="showModal"
		preset="dialog"
		title="Dialog"
		display-directive="show"
		style="width: 600px"
	>
		<template #header>
			{{ props.header || '标题' }}
		</template>

		<slot></slot>

		<template #action>
			<n-button type="primary" @click="handleConfirm"
				>确定</n-button
			>
		</template>
	</n-modal>
</template>

<script lang="ts" setup>
import { useFormModal } from '@/composables'

const { showModal, closeFormModal } = useFormModal()
const props = defineProps(['header'])
const emits = defineEmits(['confirm'])

function handleConfirm() {
	emits('confirm')
	closeFormModal()
}
</script>

<style scoped></style>
