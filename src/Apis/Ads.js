import Api from "./Api";

export default {
  new(form) {
    return Api().post("/advertisement", form);
  },

  auth() {
    return Api().get("/advertisement");
  },
};
