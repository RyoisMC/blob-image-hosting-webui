import Vue from 'vue';
import VueRouter from 'vue-router';
import { authGuard } from "../auth/authGuard";
import homepage from '../views/homepage.vue';
import files from '../views/my_files.vue';
import error_pagenotfound from '../views/error_notfound.vue';

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
        name: 'My Files',
        component: files,
        beforeEnter: authGuard,
        meta: {
            title: 'My Files',
            visible: true
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