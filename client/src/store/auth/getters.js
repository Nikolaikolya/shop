export default {
  GET_USER: ({ user }) => user ?? JSON.parse(localStorage.getItem("user")),
  GET_TOKEN: ({ token }) => token ?? localStorage.getItem("access_token"),
};
