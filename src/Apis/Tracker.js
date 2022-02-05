import Api from "./Api";

export default {
  new(form) {
    return Api().post("/team/newTracker", form);
  },

  // Post data from vue component
  track(tracker, form) {
    return Api().patch("/updateTrackerLink/" + tracker, form);
  },
  duration(tracker, form) {
    return Api().patch("/w/duration/" + tracker, form);
  },

  fetchShareDetailsByUrl(params) {
    return Api().get("/fetchShareDetailsByUrl/" + params);
  },
  fetchTrackeDetailsById(params) {
    return Api().get("/fetchTrackeDetailsById/" + params);
  },

  // Team Details
  agentDetails(params) {
    return Api().get("/agentDetails/" + params);
  },
  leadDetails(params) {
    return Api().get("/leadDetails/" + params);
  },
};
