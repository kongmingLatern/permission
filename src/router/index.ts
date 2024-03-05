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
			redirect: '/admin/user',
			children: [
				{
					path: 'user',
					name: 'admin-user',
					component: () => import('@/modules/Admin/pages/AdminUser.vue')
				},
				{
					path: 'menu',
					name: 'admin-menu',
					component: () => import('@/modules/Admin/pages/AdminMenu.vue')
				},
				{
					path: 'role',
					name: 'admin-role',
					component: () => import('@/modules/Admin/pages/AdminRole.vue')
				},
				{
					path: 'permission',
					name: 'admin-permission',
					component: () => import('@/modules/Admin/pages/AdminPermission.vue')
				},
				{
					path: 'log',
					name: 'admin-log',
					component: () => import('@/modules/Admin/pages/AdminLog.vue')
				},
			]
		},
	],
})

export default router
