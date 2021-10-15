export default {
  SET_ALL_POSTS: (state, payload) => (state.posts = payload),
  SET_MY_POSTS: (state, payload) => (state.myPosts = payload),
  SET_PUBLISHED_POSTS: (state, payload) => (state.publishedPosts = payload),
};
