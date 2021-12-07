import {
  calculateFilling,
  doughCartTextMap,
  doughMap,
  getNameById,
  getValueById,
} from "@/common/helpers";

const calculatePrice = (pizza, rootState) => {
  let doughPrice = rootState.pizza.dough.find(
    (dough) => dough.id === pizza.doughId
  ).price;
  let saucePrice = rootState.pizza.sauces.find(
    (sauce) => sauce.id === pizza.sauceId
  ).price;
  let multiplier = rootState.pizza.sizes.find(
    (size) => size.id === pizza.sizeId
  ).multiplier;
  let filling = {};
  pizza.ingredients.forEach((ingredient) => {
    filling[ingredient.ingredientId] = ingredient.quantity;
  });
  let fillingPrice = calculateFilling(
    filling,
    rootState.pizza.ingredients,
    true
  );
  return multiplier * (doughPrice + saucePrice + fillingPrice);
};

const formatPizzaFromId = (pizzas, rootState) => {
  return pizzas.map((pizzaItem) => ({
    sauce: getNameById(rootState.pizza.sauces, pizzaItem.sauceId),
    dough: doughCartTextMap[getValueById(doughMap, pizzaItem.doughId)],
    size: getNameById(rootState.pizza.sizes, pizzaItem.sizeId),
    ingredients: pizzaItem.ingredients.map((ingredient) =>
      getNameById(rootState.pizza.ingredients, ingredient.id)
    ),
    price: calculatePrice(pizzaItem, rootState),
    quantity: pizzaItem.quantity,
  }));
};

const orderPizzaTotal = (pizzas, rootState) => {
  return pizzas.reduce((total, pizzaItem) => {
    return total + calculatePrice(pizzaItem, rootState) * pizzaItem.quantity;
  }, 0);
};

const orderMiscTotal = 0;

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
            total:
              orderPizzaTotal(order.orderPizzas, rootState) + orderMiscTotal,
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
