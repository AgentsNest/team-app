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
  deleteClientProfile(params) {
    return Api().delete("/deleteClientProfile/" + params);
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
  deleteClientProperty(params) {
    return Api().delete("/deleteClientProperty/" + params);
  },
  updateProperty(id, form) {
    return Api().post("/updateProperty/" + id, form);
  },

  singleClientProperty(params) {
    return Api().get("/singleClientProperty/" + params);
  },
  singleClientPropertyForEdit(params) {
    return Api().get("/singleClientPropertyForEdit/" + params);
  },

  allBuilder() {
    return Api().get("/promoters");
  },

  // Property Payment added
  singlePropertyPayment(params) {
    return Api().get("/singlePropertyPayment/" + params);
  },
  addPropertyPayment(form) {
    return Api().post("/addPropertyPayment", form);
  },
  updatePropertyPayment(id, form) {
    return Api().patch("/updatePropertyPayment/" + id, form);
  },

  // Charges and taxes
  updateTaxCharges(id, data){
    return Api().put("/updateTaxCharges/" + id, data);
  },
  deleteAllotmentCharge(params) {
    return Api().delete("/deleteAllotmentCharge/" + params);
  },
  addAllotmentCharges(form) {
    return Api().post("/addAllotmentCharges", form);
  },

  deletePropertyPayment(params) {
    return Api().delete("/deletePropertyPayment/" + params);
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
