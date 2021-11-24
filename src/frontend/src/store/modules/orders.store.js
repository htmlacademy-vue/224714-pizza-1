import { getNameById } from "@/common/helpers";

const formatPizzaFromId = (pizza, rootGetters) => {
  return pizza.map({
    sauce: getNameById(rootGetters.sauces, pizza.sauceId),
    dough: getNameById(rootGetters.doughs, pizza.doughId),
    size: getNameById(rootGetters.sizes, pizza.sizeId),
    ingredients: pizza.ingredients.map((ingredient) =>
      getNameById(rootGetters.ingredients, ingredient.id)
    ),
  });
};

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    ordersFormatted(state, getters, rootState, rootGetters) {
      return state.orders.map((order) => {
        return {
          total: 1111,
          orderPizzas: formatPizzaFromId(order.orderPizzas, rootGetters),
        };
      });
    },
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders;
    },
    addOrder(state, order) {
      //Todo запрос к api
      state.orders.push(order);
    },
  },
  actions: {
    async query(context) {
      const data = await this.$api.orders.query();
      context.commit("setOrders", data);
    },
    async post(context, order) {
      const newOrder = await this.$api.orders.post(order);
      // [UPDATE_ENTITY] ???
      // const index = state.orders.findIndex(({ id }) => id === value.id);
      // if (~index) {
      //   state[module][entity].splice(index, 1, value);
      // }
      context.commit("addOrder", newOrder);
    },
  },
};
