import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/views/layout/Layout'

Vue.use(Router)

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'

export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },

    // {
    //     path: '/',
    //     component: Layout,
    //     redirect: '/dashboard',
    //     name: 'Dashboard',
    //     hidden: true,
    //     children: [{
    //         path: 'dashboard',
    //         name: 'dashboard',
    //         component: () => import('@/views/dashboard/index'),
    //         meta: {
    //             title: 'dashboard',
    //             icon: 'dashboard',
    //             noCache: true
    //         }
    //     }]
    // },
    {
        path: '/',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            name: 'dashboard',
            meta: {
                title: '首页',
                icon: 'dashboard'
            }
        }]
    },

    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: 'Table', icon: 'example' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/views/table/index'),
                meta: { title: '表格' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () => import('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'tree' }
            },
            {
                path: 'upload-excel',
                component: () => import('@/views/excel/uploadExcel'),
                name: 'UploadExcel',
                meta: {
                    title: '表格上传'
                }
            },
            {
                path: 'steptable',
                component: () => import('@/views/steptable'),
                name: 'Steptable',
                meta: {
                    title: 'Steps 步骤'
                }
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Form',
                component: () => import('@/views/form/index'),
                meta: { title: '表单', icon: 'form' }
            }
        ]
    },
 
    /** When your routing table is too long, you can split it into small modules**/
    componentsRouter,
    chartsRouter,
    
    {
        path: '/icon',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Icons',
            component: () => import('@/views/svg-icons/index'),
            meta: {
                title: '图标',
                icon: 'icon',
                noCache: true
            }
        }]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'nested',
        meta: {
            title: 'nested',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index'), // Parent router-view
                name: 'menu1',
                meta: { title: 'menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        name: 'menu1-1',
                        meta: { title: 'menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        name: 'menu1-2',
                        meta: { title: 'menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'menu1-2-1',
                                meta: { title: 'menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'menu1-2-2',
                                meta: { title: 'menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        name: 'menu1-3',
                        meta: { title: 'menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index'),
                meta: { title: 'menu2' }
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true },
    {
        path: '/error',
        component: Layout,
        redirect: 'noredirect',
        name: 'ErrorPages',
        meta: {
        title: '错误页面',
        icon: '404'
        },
        children: [
        {
            path: '401',
            component: () => import('@/views/401'),
            name: '401',
            meta: { title: '401', noCache: true }
        },
        {
            path: '402',
            component: () => import('@/views/402'),
            name: '402',
            meta: {
                title: '402',
                noCache: true
            }
        },
        {
            path: '403',
            component: () => import('@/views/403'),
            name: '403',
            meta: {
                title: '403',
                noCache: true
            }
        },
        {
            path: '404',
            component: () => import('@/views/404'),
            name: '404',
            meta: { title: '404', noCache: true }
        }
        ]
    }
];
export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
