/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: '组件',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: { title: '富文本编辑器' }
    },
    // {
    //   path: 'markdown',
    //   component: () => import('@/views/components-demo/markdown'),
    //   name: 'MarkdownDemo',
    //   meta: { title: 'markdown' }
    // },
    // {
    //   path: 'splitpane',
    //   component: () => import('@/views/components-demo/splitpane'),
    //   name: 'SplitpaneDemo',
    //   meta: { title: 'splitPane' }
    // },
    {
      path: 'avatar-upload',
      component: () => import('@/views/components-demo/avatarUpload'),
      name: 'AvatarUploadDemo',
      meta: { title: '头像上传' }
    },
    {
      path: 'dropzone',
      component: () => import('@/views/components-demo/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: '上传图片' }
    },
    // {
    //   path: 'sticky',
    //   component: () => import('@/views/components-demo/sticky'),
    //   name: 'StickyDemo',
    //   meta: { title: 'sticky' }
    // },
    {
      path: 'count-to',
      component: () => import('@/views/components-demo/countTo'),
      name: 'CountToDemo',
      meta: { title: '数字滚动' }
    },
    {
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: '小组件' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/components-demo/backToTop'),
      name: 'BackToTopDemo',
      meta: { title: '返回顶部' }
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/components-demo/dragDialog'),
      name: 'DragDialogDemo',
      meta: { title: '拖拽 Dialog弹出' }
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/components-demo/dndList'),
      name: 'DndListDemo',
      meta: { title: '列表拖拽' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/components-demo/dragKanban'),
      name: 'DragKanbanDemo',
      meta: { title: '可拖拽看板' }
    }
  ]
}

export default componentsRouter
