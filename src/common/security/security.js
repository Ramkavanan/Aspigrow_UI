angular.module('security', [
	'security.authentication',
	'security.authorization',
	'security.interceptor'
])

.constant('Security', {
	// Roles should be entered in descending order of priority.
	// For example, if there exists ROLE_ADMIN and ROLE_USER
	// and admin has both roles then he should be moved to ROLE_ADMIN's
	// homeState by default. To attain this, give the roles in the
	// following order.
	// ROLE_USER, ROLE_ADMIN
	Roles: [
		{
			role: 'User',
			homeState: 'fashnoid.home'
		},
		{
			role: 'Anonymous',
			homeState: 'fashnoid.login'
		}
	]
})

;
