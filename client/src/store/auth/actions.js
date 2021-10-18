import { login, register } from "../../api/auth";

export default {
  async REQUEST_AUTH({ commit }, dataFromUrl) {
    try {
      const data = await login(dataFromUrl);
      if (data) {
        console.log(data);
        const { user, tokens } = data;
        commit("SET_TOKEN", tokens.access_token);
        commit("SET_USER", user);

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", tokens.access_token);
        localStorage.setItem("refresh_token", tokens.refresh_token);

        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async REQUEST_REGISTER({ commit }, dataFromUrl) {
    try {
      const data = await register(dataFromUrl);
      if (data) {
        console.log(data);
        const { user, tokens } = data;
        commit("SET_TOKEN", tokens.access_token);
        commit("SET_USER", user);

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", tokens.access_token);
        localStorage.setItem("refresh_token", tokens.refresh_token);

        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
