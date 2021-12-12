import Api from "./Api";

export default {
  // Message
  unRead() {
    return Api().get("/unreadNotifications");
  },

  markAsRead() {
    return Api().get("/markReadNotifications");
  },
};
