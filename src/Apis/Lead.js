import Api from "./Api";

export default {
  new(form) {
    return Api().post("/leads", form);
  },
  bulk(form) {
    return Api().post("/upload", form);
  },
  delete(id) {
    return Api().delete("/lead/" + id);
  },

  edit(id) {
    return Api().get("/leads/" + id);
  },

  auth() {
    return Api().get("/leads/by/user");
  },

  details(id) {
    return Api().get("/leads/" + id);
  },

  // Followups and Activity
  addActivityNotes(form) {
    return Api().post("/addActivityNotes", form);
  },

  addActivityCall(form) {
    return Api().post("/addActivityCall", form);
  },
  addActivityMessage(form) {
    return Api().post("/addActivityMessage", form);
  },
  addActivityWhatsapp(form) {
    return Api().post("/addActivityWhatsapp", form);
  },

  addFollowup(form) {
    return Api().post("/addFollowup", form);
  },

  getFollowups() {
    return Api().get("/getFollowups");
  },
};
