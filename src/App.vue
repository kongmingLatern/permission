<template>
	<n-message-provider>
		<n-notification-provider>
			<n-modal-provider>
				<RouterView />
			</n-modal-provider>
		</n-notification-provider>
	</n-message-provider>
</template>

<script setup lang="ts"></script>

<style scoped></style>
