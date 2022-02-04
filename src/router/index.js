import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Auth/Login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Auth/Profile.vue"),
  },
  {
    path: "/team-dashboard",
    name: "TeamDashboard",
    component: () => import("../views/TeamDashboard/Index.vue"),
    meta: { authOnly: true },
  },
  {
    path: "/leads",
    name: "allLeads",
    component: () => import("../views/Leads/Index.vue"),
    meta: { authOnly: true },
  },
  {
    path: "/lead/:id",
    name: "singleLead",
    component: () =>
      import(
        /* webpackChunkName: "single-leads" */ "../views/Leads/Single.vue"
      ),
  },
  {
    path: "/websites",
    name: "Websites",
    component: () =>
      import(/* webpackChunkName: "my-website" */ "../views/Website/Index.vue"),
  },
  {
    path: "/w/info/:id",
    name: "WebsiteDetails",
    component: () =>
      import(
        /* webpackChunkName: "website-details" */ "../views/Website/Single.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
