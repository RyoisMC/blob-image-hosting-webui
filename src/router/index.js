import Vue from 'vue';
import VueRouter from 'vue-router';
import { authGuard } from "../auth/authGuard";
const homepage = () => import(/* webpackChunkName: "homepage" */ '../views/homepage.vue');
const files = () => import(/* webpackChunkName: "files" */ '../views/files.vue');
const error_pagenotfound = () => import(/* webpackChunkName: "error_pagenotfound" */ '../views/error_notfound.vue');
const unknown_user = () => import(/* webpackChunkName: "unknown_user" */ '../views/unknown_user.vue');
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homepage,
    beforeEnter: authGuard,
    meta: {
      title: 'Home',
      visible: true
    },
  },
  {
    path: '/files',
    name: 'Files',
    component: files,
    beforeEnter: authGuard,
    meta: {
      title: 'Files',
      visible: true
    },
  },
  {
    path: '/unknown_user',
    name: 'unknown_user',
    component: unknown_user,
    meta: {
      title: 'Unknown User',
      visible: false
    },
  },
  {
    path: '*',
    name: '404 Not Found',
    component: error_pagenotfound,
    meta: {
      title: '404 Not Found',
      visible: false
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) document.title = `${nearestWithTitle.meta.title} | Blob Image Hosting`;

  Array.from(
    document.querySelectorAll('[data-vue-router-controlled]'),
  ).map((el) => el.parentNode.removeChild(el));

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;