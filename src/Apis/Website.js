import Api from "./Api";

export default {
  searchMyWebsite(params) {
    return Api().get("/team/myebsite/search?q=" + params);
  },
  auth() {
    return Api().get("/team/mywebsites");
  },
  SlugDetails(params) {
    return Api().get("/w/" + params);
  },
};
