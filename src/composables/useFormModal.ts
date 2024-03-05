import { ref } from 'vue'

const showModal = ref(false)
export function useFormModal() {

	function openFormModal() {
		showModal.value = true
	}

	function closeFormModal() {
		showModal.value = false
	}


	return {
		showModal,
		openFormModal,
		closeFormModal,
	}
}
