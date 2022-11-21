import { createWebHistory, createRouter } from "vue-router";
import Cv from "../components/Vitai.vue"
import Home from "../router/Homenavigator.vue"
import Pulsa from "../components/Mamapulsa.vue"
import Contak from "../components/Contak.vue"
//dibawah ini import halamannya

const routes = [
    {
        path: '/Home',
        component: Home,
    },
    {
        path: '/cv',
        component: Cv,
    },
    {
        path: '/Pulsa',
        component: Pulsa,
    },
    {
        path: '/Contak',
        component: Contak,
    },
    {
        path:"/list",
        name: "List",
        component:() => import("../views/List.vue"),
    },
    // {
    //     path:"/detail",
    //     name: "Detail",
    //     component:() => import("../views/Detail.vue"),
    // },
    //    {
    //     path:"/:pathMatch(.*)",
    //     name: "",
    //     component:() => import("../views/NotFound.vue"),
    // },
    {
        path:"/artikel",
        name: "List Artikel",
        component:() => import("../views/Artikel.vue"),
    },
    {
        path:"/artikel/:id",
        name: "DETAIL Artikel",
        component:() => import("../views/Articlede.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;