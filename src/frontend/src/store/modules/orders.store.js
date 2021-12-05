import { getNameById } from "@/common/helpers";

const formatPizzaFromId = (pizza, rootState) => {
  return pizza.map((pizzaItem) => ({
    sauce: getNameById(rootState.pizza.sauces, pizzaItem.sauceId),
    dough: getNameById(rootState.pizza.dough, pizzaItem.doughId),
    size: getNameById(rootState.pizza.sizes, pizzaItem.sizeId),
    ingredients: pizzaItem.ingredients.map((ingredient) =>
      getNameById(rootState.pizza.ingredients, ingredient.id)
    ),
  }));
};

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    ordersFormatted(state, getters, rootState) {
      if (state.orders) {
        return state.orders.map((order) => {
          return {
            total: 1111,
            orderPizzas: formatPizzaFromId(order.orderPizzas, rootState),
          };
        });
      }
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
