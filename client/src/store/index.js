import { createStore } from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import state from "./state";

// Modules
import auth from "./auth";

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    auth,
  },
});
