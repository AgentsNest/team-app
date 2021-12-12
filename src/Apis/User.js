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
};
