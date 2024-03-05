<template>
	<n-layout has-sider>
		<n-layout-sider
			bordered
			collapse-mode="width"
			:collapsed-width="64"
			:width="240"
			:collapse="false"
			show-trigger
			p-0
			h-screen
		>
			<AdminMenu />
		</n-layout-sider>
		<n-layout>
			<n-layout-header
				p-1rem
				pb-10px
				style="border-bottom: 1px solid var(--border-color)"
			>
				<AdminHeader />
			</n-layout-header>
			<n-layout-content>
				<AdminDynamicTag
					p-1
					style="
						border-bottom: 1px solid var(--border-color);
					"
				/>
				<RouterView />
			</n-layout-content>
			<n-layout-footer text-center color="#bbb"
				>&copy;&nbsp;江苏中服跨境贸易服务有限公司</n-layout-footer
			>
		</n-layout>
	</n-layout>
</template>

<script setup lang="ts">
import AdminMenu from '@/modules/Admin/components/AdminMenu.vue'
import AdminHeader from '@/modules/Admin/components/AdminHeader.vue'
import AdminDynamicTag from '@/modules/Admin/components/AdminDynamicTag.vue'
</script>

<style scoped></style>
