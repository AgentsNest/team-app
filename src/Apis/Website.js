import Api from "./Api";

export default {
  delete(id) {
    return Api().delete("/websites/" + id);
  },

  edit(id) {
    return Api().get("/leads/" + id);
  },

  all() {
    return Api().get("/websites");
  },

  search(params) {
    return Api().get("/website/search?q=" + params);
  },

  auth() {
    return Api().get("/websites/by/user");
  },

  clone(id) {
    return Api().get("/w/" + id + "/clone");
  },

  details(params) {
    return Api().get("/websites/" + params);
  },

  SlugDetails(params) {
    return Api().get("/w/" + params);
  },
  websiteById(params) {
    return Api().get("/w_by_id/" + params);
  },

  builders() {
    return Api().get("/allPromotors");
  },

  new(form) {
    return Api().post("/new-website", form);
  },

  share(form) {
    return Api().post("/share_client", form);
  },

  track(lead, website, agent) {
    return Api().patch(website + agent + lead);
  },

  gallery(form) {
    return Api().post("/websiteImage", form);
  },
};
