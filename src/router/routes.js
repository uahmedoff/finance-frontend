const routes = [
    
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/layouts/Auth.vue'),
      children:[
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/auth/Login.vue'),
        }
      ]
    },

    {
        path: "/",
        name: "Main",
        component: () => import("@/layouts/Main.vue"),
        meta: {
          requiresAuth: true,
        },      
        children: [
          {
            path: "",
            name: "Home",
            component: () =>
              import("@/views/Dashboard.vue"),
          },
          {
            path: "users",
            name: "User",
            component: () =>
              import("@/views/user/All.vue"),
            children: [
              {
                path: "add",
                name: "CreateUser",
                component: () =>
                  import("@/views/user/Add.vue"),
              },
              {
                path: ":user_id/edit",
                name: "EditUser",
                component: () =>
                  import("@/views/user/Edit.vue"),
              },
            ]  
          },
          {
            path: "roles",
            name: "Role",
            component: () =>
              import("@/views/role/All.vue"),
          },
          {
            path: "roles/:role_id/permissions",
            name: "RolePermissions",
            component: () =>
              import("@/views/role/AttachPermissions.vue"),
          },
        ]
    },

]

export default routes;