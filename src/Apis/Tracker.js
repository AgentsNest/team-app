import Api from "./Api";

export default {
  new(form) {
    return Api().post("/team/newTracker", form);
  },
};
