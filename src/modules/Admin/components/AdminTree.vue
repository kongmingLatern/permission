<template>
	<n-tree
		block-line
		cascade
		checkable
		:selectable="false"
		:data="data || []"
		:default-expanded-keys="defaultExpanedKeys || []"
		:default-checked-keys="$props.defaultCheckedKeys || []"
		@update:checked-keys="updateCheckedKeys"
	/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { TreeOption } from 'naive-ui'
import { formatMenu } from '@/utils'

export default defineComponent({
	props: [
		'data',
		'defaultExpandedKeys',
		'defaultCheckedKeys',
	],
	setup(props, { emit }) {
		const data = formatMenu(props.data)
		const defaultExpanedKeys = computed(() =>
			data.map(i => i.key)
		)
		return {
			data,
			defaultExpanedKeys,
			updateCheckedKeys: (
				keys: Array<string | number>,
				options: Array<TreeOption | null>,
				meta: {
					node: TreeOption | null
					action: 'check' | 'uncheck'
				}
			) => {
				emit('update', keys, options, meta)
			},
		}
	},
})
</script>
