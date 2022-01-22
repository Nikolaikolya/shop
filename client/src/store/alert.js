export default {
  namespaced: true,

  state: {
    alerts: [],
  },
  actions: {
    add({ commit, state }, payload) {
      commit("add", payload);
    },
  },
  mutations: {
    add(state, { text }) {
      state.alerts.push({ text });
    },
  },
  getters: {
    all: (state) => state.alerts,
  },
};
