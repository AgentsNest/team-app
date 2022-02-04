import Api from "./Api";

export default {
  leads() {
    return Api().get("/team/my-leads/");
  },
  details(id) {
    return Api().get("/team/lead/" + id);
  },
  asignLeadToTeam(lead, form) {
    return Api().patch("/asignLeadToTeam/" + lead, form);
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
