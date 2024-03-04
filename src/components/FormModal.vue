<template>
	<n-modal
		v-model:show="showModal"
		preset="dialog"
		title="Dialog"
	>
		<template #header>
			<div>标题</div>
		</template>
		<div>内容</div>
		<template #action>
			<div>操作</div>
		</template>
	</n-modal>
</template>

<script lang="ts" setup>
import { useFormModal } from '@/composables'

const { showModal } = useFormModal()
</script>

<style scoped></style>
