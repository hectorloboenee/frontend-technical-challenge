import type { RouteRecordRaw } from 'vue-router';
import ZipCodeSearcher from './modules/zip-code-searcher/zip-code-searcher.vue';
import Home from './modules/home/home.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/zip-code-searcher',
    name: 'zip-code-searcher',
    component: ZipCodeSearcher,
  },
];
