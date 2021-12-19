import {
  calculateFilling,
  doughCartTextMap,
  doughMap,
  getNameById,
  getValueById,
  sauceMap,
  sizeTextMap,
  sizeMap,
  ingredientMap,
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
  if (!pizzas?.length || Object.keys(rootState.pizza).length === 0) {
    return [];
  }
  return pizzas.map((pizza) => ({
    name: pizza.name,
    sauce: getNameById(sauceMap, pizza.sauceId),
    dough: doughCartTextMap[getValueById(doughMap, pizza.doughId)],
    size: sizeTextMap[getValueById(sizeMap, pizza.sizeId)],
    ingredients: pizza.ingredients
      .map((ingredient) => getNameById(ingredientMap, ingredient.ingredientId))
      .join(`, `),
    price: calculatePrice(pizza, rootState),
    quantity: pizza.quantity,
  }));
};

const formatMiscFromId = (miscs, rootState) => {
  if (!miscs || !rootState.misc) return;
  return miscs.map((misc) => {
    let item = rootState.misc.find((miscItem) => miscItem.id === misc.miscId);
    let itemClone = Object.assign({}, item);
    itemClone.price = +item.price * +misc.quantity; //общая сумма по позиции
    return itemClone;
  });
};

const orderPizzaTotal = (pizzas, rootState) => {
  if (!pizzas?.length || Object.keys(rootState.pizza).length === 0) {
    return false;
  }
  return pizzas.reduce((total, pizzaItem) => {
    return total + calculatePrice(pizzaItem, rootState) * pizzaItem.quantity;
  }, 0);
};

const orderMiscTotal = (miscs, rootState) => {
  if (!miscs) {
    return 0;
  }
  let sum = 0;
  miscs.map((misc) => {
    const price = [...rootState.misc].find(
      (miscItem) => +miscItem.id === +misc.miscId
    ).price;
    sum += price * misc.quantity;
  });
  return sum;
};

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    ordersFormatted(state, getters, rootState) {
      return state.orders.map((order) => {
        return {
          id: order.id,
          total:
            orderPizzaTotal(order.orderPizzas, rootState) +
            orderMiscTotal(order.orderMisc, rootState),
          orderPizzas: formatPizzaFromId(order.orderPizzas, rootState),
          orderMisc: formatMiscFromId(order.orderMisc, rootState),
          orderAddress: order.orderAddress,
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
      context.commit("addOrder", newOrder);
    },
    async delete({ dispatch }, orderId) {
      await this.$api.orders.delete(orderId);
      dispatch("query");
    },
  },
};
