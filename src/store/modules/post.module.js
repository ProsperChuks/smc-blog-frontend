import sanityClient from "../../services/sanity";

const getInitialState = () => {
  return {
    post: {
      author: "",
      date: "",
      content: "",
      title: "",
      image: null
    },
  };
};

const state = getInitialState();

export default {
  namespaced: true,
  state,
  mutations: {
    ADD_POST: function (state, payload) {
      state.post.author = payload.data.result.author.name;
      state.post.date = payload.data.result._createdAt;
      state.post.title = payload.data.result.title;
      state.post.image = payload.data.result.mainImage;
      state.post.content = payload.data.result.body.children.text;
    },
  },
  actions: {
    async addPost({ commit }, payload) {
      const post = await sanityClient.loadPost(payload).then((response) => {
        commit("ADD_POST", response);
        console.log(response);
      });
    },
  },
};
