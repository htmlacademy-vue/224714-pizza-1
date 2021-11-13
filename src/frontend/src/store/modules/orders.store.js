export default {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders;
    },
    addOrder(state, order) {
      //Todo запрос к api
      console.log();
      state.orders.push(order);
    },
  },
  actions: {
    async query(context) {
      const data = await this.$api.orders.query();
      context.commit("setOrders", data);
    },
    async addOrder(context, order) {
      // const newOrder = await this.$api.orders.put(order);
      // [UPDATE_ENTITY] ???
      context.commit("addOrder", order);
    },
  },
};
