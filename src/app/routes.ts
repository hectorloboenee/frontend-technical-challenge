import type {RouteRecordRaw} from "vue-router";
import ZipCodeSearcher from "./modules/zip-code-searcher/zip-code-searcher.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: '/zip-code-searcher',
        component: ZipCodeSearcher,
    }
]