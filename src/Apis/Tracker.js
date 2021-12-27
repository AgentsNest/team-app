import Api from "./Api";

export default {
  all() {
    return Api().get("/websiteTracker");
  },

  new(form) {
    return Api().post("/websiteTracker", form);
  },

  // Post data from vue component
  track(tracker, form) {
    return Api().patch("/updateTrackerLink/" + tracker, form);
  },
  duration(tracker, form) {
    return Api().patch("/w/duration/" + tracker, form);
  },

  details(params) {
    return Api().get("/w/" + params);
  },

  websiteShowById(params) {
    return Api().get("/w_by_id/" + params);
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

  fetchWebsiteForSharedTrackById(params) {
    return Api().get("/fetchWebsiteForSharedTrackById/" + params);
  },

  // Agent Details
  agentDetails(params) {
    return Api().get("/agentDetails/" + params);
  },
  leadDetails(params) {
    return Api().get("/leadDetails/" + params);
  },
};
