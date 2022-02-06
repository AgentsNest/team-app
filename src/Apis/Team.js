import Api from "./Api";

export default {
  login(form) {
    return Api().post("/team-login", form);
  },
  logout() {
    return Api().post("/team-logout");
  },
  updateProfile(id, form) {
    return Api().patch("/team/profile-update/" + id, form);
  },
  updatelogo(id, data) {
    return Api().put("/team-avatar/" + id, data);
  },

  auth() {
    return Api().get("/getteam-account");
  },
  vcard(params) {
    return Api().get("/team/vcard/" + params);
  },
  teamCompanyDetails(params) {
    return Api().get("/teamCompanyDetails/" + params);
  },
};
