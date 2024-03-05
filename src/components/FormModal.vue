<template>
	<n-modal
		v-model:show="showModal"
		preset="dialog"
		title="Dialog"
		display-directive="show"
	>
		<template #header>
			{{ props.header || '标题' }}
		</template>

		<slot></slot>

		<template #action>
			<n-button type="primary" @click="closeFormModal"
				>确定</n-button
			>
		</template>
	</n-modal>
</template>

<script lang="ts" setup>
import { useFormModal } from '@/composables'

const { showModal, closeFormModal } = useFormModal()
const props = defineProps(['header'])
</script>

<style scoped></style>
