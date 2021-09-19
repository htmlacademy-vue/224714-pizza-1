export default {
  namespaced: true,
  state: {
    pizza: {},
    price: 0,
  },
  mutations: {
    setPrice(state, payload) {
      state.price = payload;
    },
  },
  actions: {
    setPrice(context, payload) {
      context.commit("setPrice", payload);
    },
  },
};
