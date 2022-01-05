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

  auth(page) {
    return Api().get("/leads/by/user?page=" + page);
  },

  authHotLead(page) {
    return Api().get("/user/hot-lead?page=" + page);
  },

  leadsAnalytics() {
    return Api().get("/leads-analytics");
  },

  details(id) {
    return Api().get("/leads/" + id);
  },

  /**
   * Activities Request
   */
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
  allActivityByUser() {
    return Api().get("/all-activity-by-user");
  },

  /**
   * Followups
   */

  addFollowup(form) {
    return Api().post("/addFollowup", form);
  },

  getFollowups() {
    return Api().get("/getFollowups");
  },

  // Team Leads API's
  getTeamMemberLead(param) {
    return Api().get("/allLeadsByTeamMember/" + param);
  },
};
