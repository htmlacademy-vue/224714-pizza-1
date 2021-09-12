export default {
  namespaced: true,
  state: {
    pizza: {},
    price: 0,
  },
  mutations: {
    setPrice(state, payload) {
      state.price = payload.price;
    },
  },
  actions: {
    setPrice(state, payload) {
      this.commit("setPrice", payload);
    },
  },
};
