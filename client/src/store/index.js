import { createStore } from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import state from "./state";

import { addErrorHandler } from "../helpers/Request";

// Modules
import auth from "./auth";
import alert from "./alert";

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    auth,
    alert,
  },
});

addErrorHandler((response) => {
  const { data } = response;

  if (data.success) return response;

  store.dispatch("alert/add", { text: data.message });
});

export default store;
