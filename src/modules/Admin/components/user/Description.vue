<template>
	<n-descriptions
		label-placement="left"
		bordered
		:columns="2"
	>
		<n-descriptions-item label="角色编号">
			{{ props.current.roleCode }}
		</n-descriptions-item>
		<n-descriptions-item label="角色名称">
			{{ props.current.roleName }}
		</n-descriptions-item>
		<n-descriptions-item label="权限控制" :span="2">
			<AdminTree :data="demoJSON" @update="handleUpdate" />
		</n-descriptions-item>
	</n-descriptions>

	<n-flex justify="end">
		<n-button @click="$emit('confirm', treeData)"
			>确定</n-button
		>
	</n-flex>
</template>

<script setup lang="ts">
import AdminTree from '@/modules/Admin/components/AdminTree.vue'
import demoJSON from '../demo.json'
import { ref } from 'vue'
const props = defineProps(['current'])
const emits = defineEmits(['confirm'])
const treeData = ref([])
const handleUpdate = data => {
	treeData.value = data
}
</script>

<style scoped></style>
