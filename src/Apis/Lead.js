import Api from "./Api";

export default {
  new(form) {
    return Api().post("/team/add-lead", form);
  },
  bulk(form) {
    return Api().post("/team/bulk-lead", form);
  },
  leads() {
    return Api().get("/team/my-leads/");
  },
  details(id) {
    return Api().get("/team/lead/" + id);
  },
  asignLeadToTeam(lead, form) {
    return Api().patch("/asignLeadToTeam/" + lead, form);
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
};
