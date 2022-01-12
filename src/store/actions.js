import Lead from "../Apis/Lead";
import User from "../Apis/User";
import Other from "../Apis/Other";

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

export const getGroup = ({ commit }) => {
  Other.userGroup().then((response) => {
    commit("SET_GROUPS", response.data);
  });
};
export const getTeams = ({ commit }) => {
  User.agentTeam().then((response) => {
    commit("SET_TEAMS", response.data);
  });
};
