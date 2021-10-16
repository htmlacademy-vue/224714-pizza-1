export default {
  namespaced: true,
  state: {
    pizzas: [],
    misc: [],
  },
  getters: {
    totalPrice(state) {
      return state.pizzas.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0
      );
    },
  },
  mutations: {
    addPizza(state, newPizza) {
      const samePizzaIndex = state.pizzas
        ? state.pizzas.findIndex((pizza) => pizza.id === newPizza.id)
        : null;
      if (samePizzaIndex !== -1) {
        const oldQuantity = state.pizzas[samePizzaIndex][`quantity`];
        let newPizzaWithQuantity = Object.assign(newPizza, {
          quantity: oldQuantity,
        });
        state.pizzas[samePizzaIndex] = newPizzaWithQuantity;
      } else {
        Object.assign(newPizza, { quantity: 1 });
        state.pizzas.push(newPizza);
      }
    },
    removePizza(state, pizza) {
      state.pizzas = [].concat(
        state.pizzas.filter((pizzaItem) => pizzaItem.id !== pizza.id)
      );
    },
    plusOnePizza(state, pizzaId) {
      const samePizzaIndex = state.pizzas
        ? state.pizzas.findIndex((pizza) => pizza.id === pizzaId)
        : null;
      console.log(pizzaId);
      console.log(state.pizzas[samePizzaIndex]);
      state.pizzas[samePizzaIndex][`quantity`] += 1;
    },
    minusOnePizza(state, pizzaId) {
      const samePizzaIndex = state.pizzas
        ? state.pizzas.findIndex((pizza) => pizza.id === pizzaId)
        : null;
      if (state.pizzas[samePizzaIndex][`quantity`] === 1) {
        const deletedPizza = state.pizzas[samePizzaIndex];
        state.pizzas = [].concat(
          state.pizzas.filter((pizzaItem) => pizzaItem.id !== deletedPizza.id)
        );
      } else {
        state.pizzas[samePizzaIndex][`quantity`] -= 1;
      }
    },
  },
  actions: {
    addPizza(context, pizza) {
      context.commit("addPizza", pizza);
    },
    removePizza(context, pizza) {
      context.commit("removePizza", pizza);
    },
    plusOnePizza(context, pizzaId) {
      context.commit("plusOnePizza", pizzaId);
    },
    minusOnePizza(context, pizzaId) {
      context.commit("minusOnePizza", pizzaId);
    },
  },
};
