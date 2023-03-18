import { createStore } from "vuex";
import postModule from "./modules/post.module";
import createPersistedState from "vuex-persistedstate";

// Create a new store instance.
const store = createStore({
  plugins: [createPersistedState()],
  state() {},
  mutations: {},
  modules: {
    postModule,
  },
  getters: {
    getPost(state) {
      return state.postModule.post;
    },
  },
});

export default store;
