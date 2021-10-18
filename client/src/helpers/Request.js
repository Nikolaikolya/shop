import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://localhost:5050/api/v1",
  headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  validateStatus: async function (status) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (status === 401) {
      const newTokens = await axios.post(
        "http://localhost:5010/api/auth/refresh",
        {
          id: user.id,
          refresh_token: localStorage.getItem("refresh_token"),
        }
      );
      console.log(newTokens.data.success);
      console.log(newTokens.data.tokens);
      localStorage.setItem("access_token", newTokens.data.tokens.access_token);
      localStorage.setItem(
        "refresh_token",
        newTokens.data.tokens.refresh_token
      );
      return true;
    }
    return status >= 200 && status < 300; // default
  },
});

export const returningRequest = (data) => {
  if (data.success) return data;
  else return false;
};
