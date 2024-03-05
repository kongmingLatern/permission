import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'index',
			redirect: '/login',
		},
		{
			path: '/login',
			name: 'login',
			component: () =>
				import('@/modules/Login/pages/login.vue'),
		},
		{
			path: '/register',
			name: 'register',
			component: () =>
				import('@/modules/Login/pages/register.vue'),
		},
		{
			path: '/admin',
			name: 'admin',
			component: () =>
				import('@/modules/Admin/pages/index.vue'),
			children: [
				{
					path: 'user',
					name: 'admin-user',
					component: () => import('@/modules/Admin/pages/AdminUser.vue')
				},
			]
		},
	],
})

export default router
