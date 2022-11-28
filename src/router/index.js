import { createWebHistory, createRouter } from "vue-router";
import Cv from "../components/Vitai.vue"
import Home from "../router/Homenavigator.vue"
import Pulsa from "../components/Tantepulsa.vue"
import Perpus from "../components/Perpusbuku.vue"
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
        path: '/Perpus',
        component: Perpus,
    },
    {
        path:"/list",
        name: "List",
        component:() => import("../components/List.vue"),
    },
    {
        path:"/databuku",
        name:"Databuku",
        component:() => import("../components/Databuku.vue"),
    },
    {
        path:"/databuku/:id",
        component:() => import("../components/Detailbuku.vue"),
    },
    {
        path:"/tambahbuku",
        name:"tambahbuku",
        component:() => import("../components/Tambahbuku.vue"),
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