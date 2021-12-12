import Api from "./Api";

export default {
  new(form) {
    return Api().post("/websites", form);
  },

  delete(id) {
    return Api().delete("/websites/" + id);
  },
};
