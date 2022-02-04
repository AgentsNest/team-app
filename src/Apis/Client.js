import Api from "./Api";

export default {
  login(form) {
    return Api().post("/client-login", form);
  },
  logout() {
    return Api().post("/client-logout");
  },
  auth() {
    return Api().get("/client");
  },

  // Client View Apis
  singleClientProperty(params) {
    return Api().get("/singleClientProperty/" + params);
  },

  clientProperties(params) {
    return Api().get("/client/" + params);
  },
  clientMyProperty() {
    return Api().get("/clientProperty");
  },
  clientConnectAgents() {
    return Api().get("/clientConnectAgents");
  },
};
