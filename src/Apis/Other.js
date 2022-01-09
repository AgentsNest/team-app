import Api from "./Api";

export default {
  types() {
    return Api().get("/property-type");
  },

  status() {
    return Api().get("/status");
  },

  // Groups
  userGroup() {
    return Api().get("/groups/by/user");
  },

  newGroup(form) {
    return Api().post("/groups/", form);
  },

  leadsByGroup(id) {
    return Api().get("/group/" + id);
  },

  // Message
  allMessage() {
    return Api().get("/messages");
  },
  myMessage() {
    return Api().get("/messages/by/user");
  },
  new(form) {
    return Api().post("/messages/", form);
  },
  deleteMsg(params) {
    return Api().post("/messages/", params);
  },

  getWebhook() {
    return Api().get("/webhook");
  },
};
