import Api from "./Api";

export default {
  // Message
  unRead() {
    return Api().get("/team/unreadNotifications");
  },

  markAsRead() {
    return Api().get("/team/markReadNotifications");
  },
};
