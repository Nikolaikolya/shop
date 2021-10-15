import { HTTP } from "../../helpers/Request";

export default {
  async REQUEST_ALL_POSTS({ commit }) {
    try {
      const { data } = await HTTP.get("/api/post");
      if (data.success) {
        commit("SET_ALL_POSTS", data.posts);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async REQUEST_MY_POSTS({ commit }) {
    try {
      const token = localStorage.getItem("access_token");
      console.log(token);
      const { id } = JSON.parse(localStorage.getItem("user"));
      const { data } = await HTTP.post(
        "/api/post/my",
        { user_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        commit("SET_MY_POSTS", data.posts);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async REQUEST_NEW_POST({ dispatch }, requestData) {
    try {
      const { data } = await HTTP.post("/api/post", requestData);
      console.log(data);
      if (data.success) {
        await dispatch("REQUEST_MY_POSTS");
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async REQUEST_GET_POST_BY_ID({ dispatch }, postId) {
    console.log(dispatch);
    try {
      const { data } = await HTTP.get(`/api/post/${postId}`);
      console.log(data);
      if (data.success) {
        // await dispatch("REQUEST_MY_POSTS");
        return data.post;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async REQUEST_GET_PUBLISHED_POST({ commit }) {
    try {
      const { data } = await HTTP.get(`/api/admin/publish`);
      console.log(data);
      if (data.success) {
        commit("SET_PUBLISHED_POSTS", data.posts);
        return data.posts;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
