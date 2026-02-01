import App from "./App.vue";
import {createMemoryHistory, createRouter, type RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/', component: App
    }

]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})