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
    meta: { authOnly: true },
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Auth/Profile.vue"),
  },
  {
    path: "/t/:uid",
    name: "vCard",
    component: () =>
      import(/* webpackChunkName: "vCard" */ "../views/vcard.vue"),
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
    meta: { authOnly: true },
    component: () =>
      import(
        /* webpackChunkName: "single-leads" */ "../views/Leads/Single.vue"
      ),
  },
  {
    path: "/leads/manual",
    name: "AddLeads",
    meta: { authOnly: true },
    component: () =>
      import(/* webpackChunkName: "add-leads" */ "../views/Leads/Manual.vue"),
  },
  {
    path: "/leads/bulk",
    name: "bulkUploadLead",
    meta: { authOnly: true },
    component: () =>
      import(/* webpackChunkName: "bulk-upload" */ "../views/Leads/Bulk.vue"),
  },
  {
    path: "/websites",
    name: "Websites",
    meta: { authOnly: true },
    component: () =>
      import(/* webpackChunkName: "my-website" */ "../views/Website/Index.vue"),
  },
  {
    path: "/w/info/:id",
    name: "WebsiteDetails",
    meta: { authOnly: true },
    component: () =>
      import(
        /* webpackChunkName: "website-details" */ "../views/Website/Single.vue"
      ),
  },
  {
    path: "/wt/:tracker/:share",
    name: "trackWebsite",
    meta: { authOnly: true },
    component: () =>
      import(
        /* webpackChunkName: "track-website" */ "../views/Website/Track.vue"
      ),
  },
  {
    path: "/followups",
    name: "Followups",
    meta: { authOnly: true },
    component: () =>
      import(/* webpackChunkName: "followups" */ "../views/Leads/Followup.vue"),
  },

  /*
    * = ===================================== **
    * = ===================================== **
                  Groups Routes
    * = ===================================== **
    * = ===================================== **
  */
  {
    path: "/groups",
    name: "allGroup",
    component: () => import("../views/Group/Index.vue"),
    meta: { authOnly: true },
  },

  /*
    * = ===================================== **
    * = ===================================== **
                  Graphics Routes
    * = ===================================== **
    * = ===================================== **
  */

  {
    path: "/graphics",
    name: "Graphic",
    meta: { authOnly: true },
    component: () =>
      import(/* webpackChunkName: "graphic" */ "../views/Designs/Index.vue"),
  },
  {
    path: "/graphic/:id",
    name: "previewGraphic",
    meta: { authOnly: true },
    component: () =>
      import(
        /* webpackChunkName: "previewGraphic" */ "../views/Designs/Preview.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
