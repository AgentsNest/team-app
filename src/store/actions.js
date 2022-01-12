import Lead from "../Apis/Lead";
import User from "../Apis/User";

export const getAuth = ({ commit }) => {
  User.auth().then((response) => {
    commit("SET_AUTH", response.data.data);
  });
};

export const getLeads = ({ commit }) => {
  Lead.auth().then((response) => {
    commit("SET_LEADS", response.data.data);
    commit("TOTAL_LEADS", response.data.total);
  });
};
export const singleLead = ({ commit }, leadId) => {
  Lead.details(leadId).then((response) => {
    commit("SINGLE_LEAD", response.data.data);
  });
};
