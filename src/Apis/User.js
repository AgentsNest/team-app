import Api from "./Api";

export default {
  register(form) {
    return Api().post("/register", form);
  },

  login(form) {
    return Api().post("/login", form);
  },

  forgot(form) {
    return Api().post("/forgot", form);
  },

  logout() {
    return Api().post("/logout");
  },

  auth() {
    return Api().get("/user");
  },

  vcard(params) {
    return Api().get("/me/" + params);
  },

  authForUpdate() {
    return Api().get("/userForUpdate");
  },

  verifyRera(form) {
    return Api().get("/verifyRera", form);
  },

  update(id, form) {
    return Api().patch("/user/" + id, form);
  },

  updatelogo(id, data) {
    return Api().put("/agent-logo/" + id, data);
  },

  updateAvatar(id, data) {
    return Api().put("/agent-avatar/" + id, data);
  },

  agentTeam() {
    return Api().get("/team/of/user");
  },

  asignLeadToTeam(lead, form) {
    return Api().patch("/asignLeadToTeam/" + lead, form);
  },

  addLeadToGroup(lead, form) {
    return Api().patch("/addLeadToGroup/" + lead, form);
  },

  newTeamAdd(form) {
    return Api().post("/add-team", form);
  },

  forget(form) {
    return Api().post("forget", form);
  },

  setupIntent() {
    return Api().get("/v1/user/setup-intent");
  },
  savePaymentMethod(form) {
    return Api().post("/v1/user/payments", form);
  },
  removePaymentMethodApi(form) {
    return Api().post("/v1/user/remove-payment", form);
  },
  loadPaymentMethodsApi() {
    return Api().get("/v1/user/payment-methods");
  },
  updateSubscription(form) {
    return Api().put("/v1/user/subscription", form);
  },
};
