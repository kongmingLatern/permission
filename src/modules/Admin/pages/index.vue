<template>
	<n-layout has-sider>
		<n-layout-sider h-screen>
			<AdminMenu />
		</n-layout-sider>
		<n-layout>
			<n-layout-header>颐和园路</n-layout-header>
			<n-layout-content content-style="padding: 24px;">
				平山道
			</n-layout-content>
			<n-layout-footer>成府路</n-layout-footer>
		</n-layout>
	</n-layout>
</template>

<script setup lang="ts">
import AdminMenu from '@/modules/Admin/components/AdminMenu.vue'
</script>

<style scoped></style>
