import {
  createRouter,
  createWebHashHistory
} from 'vue-router';

// 静态路由
export const commonRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import("@/pages/Home.vue"),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/3D',
    name: '3D',
    component: () => import("@/pages/3D.vue"),
    meta: {
      title: '3D'
    }
  },
  {
    path: '/flight',
    name: 'Flight',
    component: () => import("@/pages/flight.vue"),
    meta: {
      title: 'Flight'
    }
  },
  // 外部链接
  /*{
        path: '/external-link',
        component: Layout,
        children: [
            {
                path: 'https://www.cnblogs.com/haoxianrui/',
                meta: { title: '外部链接', icon: 'link' }
            }
        ]
    }*/
  // 多级嵌套路由
  /* {
         path: '/nested',
         component: Layout,
         redirect: '/nested/level1/level2',
         name: 'Nested',
         meta: {title: '多级菜单', icon: 'nested'},
         children: [
             {
                 path: 'level1',
                 component: () => import('@/views/nested/level1/index.vue'),
                 name: 'Level1',
                 meta: {title: '菜单一级'},
                 redirect: '/nested/level1/level2',
                 children: [
                     {
                         path: 'level2',
                         component: () => import('@/views/nested/level1/level2/index.vue'),
                         name: 'Level2',
                         meta: {title: '菜单二级'},
                         redirect: '/nested/level1/level2/level3',
                         children: [
                             {
                                 path: 'level3-1',
                                 component: () => import('@/views/nested/level1/level2/level3/index1.vue'),
                                 name: 'Level3-1',
                                 meta: {title: '菜单三级-1'}
                             },
                             {
                                 path: 'level3-2',
                                 component: () => import('@/views/nested/level1/level2/level3/index2.vue'),
                                 name: 'Level3-2',
                                 meta: {title: '菜单三级-2'}
                             }
                         ]
                     }
                 ]
             },
         ]
     }*/
];
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  ...commonRoutes,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
router.beforeEach(async (to, from, next) => {
  next();
});

export default router;

