import Api from "./Api";

export default {
  new(form) {
    return Api().post("/feedback", form);
  },
};
