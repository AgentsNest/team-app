import Api from "./Api";

export default {
  allMessage() {
    return Api().get("/messages");
  },
  myMessage() {
    return Api().get("/messages/by/auth-team");
  },

  // Groups
  myGroup() {
    return Api().get("/team/mygroups");
  },
  addNewGroup(form) {
    return Api().post("/team/add-group", form);
  },
  leadsByGroup() {
    return Api().get("/team/teamSingleGroup");
  },
};
