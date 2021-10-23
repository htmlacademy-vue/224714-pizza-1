export default {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    addOrder(state, order) {
      //Todo запрос к api
      console.log();
      state.orders.push(order);
    },
  },
  actions: {
    addOrder(context, order) {
      context.commit("addOrder", order);
    },
  },
};
