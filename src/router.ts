import App from "./App.vue";
import {createMemoryHistory, createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";
import {routes as modulesRoutes} from "./app/routes.ts";

const routes: RouteRecordRaw[] = [
    ...modulesRoutes
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})