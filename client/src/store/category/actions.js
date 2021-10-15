import { HTTP } from "../../helpers/Request";

export default {
  async REQUEST_ALL_CATEGORIES({ commit }) {
    try {
      const { data } = await HTTP.get("/api/category");
      if (data.success) {
        commit("SET_ALL_CATEGORIES", data.categories);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async REQUEST_CREATE_CATEGORIES({ dispatch }, requestData) {
    console.log(requestData);
    try {
      const { data } = await HTTP.post("/api/category", requestData);
      if (data.success) {
        await dispatch("REQUEST_ALL_CATEGORIES");
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async REQUEST_UPDATE_CATEGORY({ dispatch }, requestData) {
    console.log(requestData);
    try {
      const { data } = await HTTP.put("/api/category", requestData);
      if (data.success) {
        await dispatch("REQUEST_ALL_CATEGORIES");
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
