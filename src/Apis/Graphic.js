import Api from "./Api";

export default {
  all(page) {
    return Api().get(`/graphics?page=${page}`);
  },

  downloadCount(graphic, form) {
    return Api().patch("/graphic/" + graphic, form);
  },

  details(params) {
    return Api().get("/graphics/" + params);
  },
};
