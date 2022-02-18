import Other from "../Apis/Other";

export const getGroup = ({ commit }) => {
  Other.myGroup().then((response) => {
    commit("SET_GROUPS", response.data);
  });
};
