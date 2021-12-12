import Api from "./Api";

export default {
  all() {
    return Api().get("/websiteTracker");
  },

  new(form) {
    return Api().post("/websiteTracker", form);
  },

  track(tracker, form) {
    return Api().patch("/w/" + tracker, form);
  },
  duration(tracker, form) {
    return Api().patch("/w/duration/" + tracker, form);
  },

  details(params) {
    return Api().get("/w/" + params);
  },

  leadByTotalShare(params) {
    return Api().get("/leadByTotalShare/" + params);
  },

  leadByOpened(params) {
    return Api().get("/leadByOpened/" + params);
  },

  leadByUnopened(params) {
    return Api().get("/leadByUnopened/" + params);
  },
  trackerFullDetails(params) {
    return Api().get("/websiteTracker/" + params);
  },

  // Agent Details
  agentDetails(params) {
    return Api().get("/agentDetails/" + params);
  },
  leadDetails(params) {
    return Api().get("/leadDetails/" + params);
  },
};
