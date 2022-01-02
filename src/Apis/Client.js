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
  myClient(page) {
    return Api().get(`/myClient?page=${page}`);
  },

  countMyClient() {
    return Api().get("/count-myClient");
  },

  addNewClient(form) {
    return Api().post("/addNewClient/", form);
  },

  connectWithClient(form) {
    return Api().post("/connectWithClient/", form);
  },

  searchClientByUid(uid, form) {
    return Api().get("/searchClientByUid/" + uid, form);
  },

  clientProfile(params) {
    return Api().get("/client/" + params);
  },

  addNewProperty(form) {
    return Api().post("/addClientProperty/", form);
  },
  singleClientProperty(params) {
    return Api().get("/singleClientProperty/" + params);
  },

  allBuilder() {
    return Api().get("/promoters");
  },

  addPropertyPayment(form) {
    return Api().post("/addPropertyPayment", form);
  },
  updateProperty(id, form) {
    return Api().post("/updateProperty" + id, form);
  },

  // Client View Apis
  clientProperties(params) {
    return Api().get("/client/" + params);
  },
  client() {
    return Api().get("/client");
  },
  clientMyProperty() {
    return Api().get("/clientProperty");
  },
  clientConnectAgents() {
    return Api().get("/clientConnectAgents");
  },
};
