import { useFormModal } from '@/composables'

describe('useFormModal hooks', () => {
	beforeEach(() => {
		// NOTE: 重置状态
		const { closeFormModal } = useFormModal()
		closeFormModal()
	})
	it('should be true when openFormModal', () => {
		const { showModal, openFormModal } = useFormModal()
		openFormModal()
		expect(showModal.value).toBe(true)
	})

	it('should be false when closeFormModal', () => {
		const { showModal, closeFormModal } = useFormModal()
		closeFormModal()
		expect(showModal.value).toBe(false)
	})
})
