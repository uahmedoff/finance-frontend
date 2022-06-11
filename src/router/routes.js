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
              import("@/views/HomeView.vue"),
          },
          {
            path: "about",
            name: "About",
            component: () =>
              import("@/views/AboutView.vue"),
          },
        ]
    },
    
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }


]

export default routes;