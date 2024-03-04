import router from '@/router'

export const goTo = (routerName: string) => {
	router.push({
		name: routerName,
	})
}
