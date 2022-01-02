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
  messageSample() {
    return Api().get("/messages");
  },
  new(form) {
    return Api().post("/messages/", form);
  },
};
