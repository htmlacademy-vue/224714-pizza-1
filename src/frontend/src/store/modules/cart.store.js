export default {
  namespaced: true,
  state: {
    cart: [],
  },
  mutations: {
    //TODO сделать через Vue.set
    addPizza(state, pizza) {
      state.cart.push(pizza);
      console.log(state.cart);
    },
    removePizza(state, pizza) {
      state.cart = [].concat(
        state.cart.filter((pizzaItem) => pizzaItem.id !== pizza.id)
      );
    },
  },
  actions: {
    addPizza(context, pizza) {
      context.commit("addPizza", pizza);
    },
    removePizza(context, pizza) {
      context.commit("removePizza", pizza);
    },
  },
};
