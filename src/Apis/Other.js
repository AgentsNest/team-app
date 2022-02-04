import Api from "./Api";

export default {
  allMessage() {
    return Api().get("/messages");
  },
  myMessage() {
    return Api().get("/messages/by/auth-team");
  },
};
