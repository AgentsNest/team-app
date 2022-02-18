import Api from "./Api";

export default {
  new(form) {
    return Api().post("/team/add-lead", form);
  },
  bulk(form) {
    return Api().post("/team/bulk-lead", form);
  },
  leads(page) {
    // return Api().get("/team/my-leads/");
    return Api().get(`/team/my-leads?page=${page}`);
  },
  details(id) {
    return Api().get("/team/lead/" + id);
  },
  asignLeadToTeam(lead, form) {
    return Api().patch("/asignLeadToTeam/" + lead, form);
  },
  addLeadToGroup(lead, form) {
    return Api().patch("/addLeadToGroup/" + lead, form);
  },
  leadsAnalytics() {
    return Api().get("/team/leads-analytics");
  },

  /**
   * Activities Request
   */
  addActivityNotes(form) {
    return Api().post("/team/addActivityNotes", form);
  },
  addActivityCall(form) {
    return Api().post("/team/addActivityCall", form);
  },
  addActivityMessage(form) {
    return Api().post("/team/addActivityMessage", form);
  },
  addActivityWhatsapp(form) {
    return Api().post("/team/addActivityWhatsapp", form);
  },

  /**
   * Followups
   */
  addFollowup(form) {
    return Api().post("/team/addFollowup", form);
  },

  getFollowups() {
    return Api().get("/team/getFollowups");
  },
};
