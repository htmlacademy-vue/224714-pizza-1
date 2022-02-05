import Vue from "vue";
import { getFillingArrayFromObject } from "@/common/helpers";
import { DEFAULT_ADDRESS_OPTION } from "@/common/const";

const getDefaultState = () => {
  return {
    pizzas: [],
    misc: {},
    phone: null,
    address: null,
    addressOption: DEFAULT_ADDRESS_OPTION,
    isSuccessPopupShown: false,
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    totalPizzaPrice(state) {
      return state.pizzas.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0
      );
    },
    totalMiscPrice(state, getters, rootState) {
      let sum = 0;
      if (Object.keys(state.misc).length) {
        for (let miscId in state.misc) {
          const quantity = state.misc[miscId];
          const price = [...rootState.misc].find(
            (miscItem) => miscItem.id === +miscId
          ).price;
          sum += price * quantity;
        }
      }
      return sum;
    },
    totalPrice(state, getters) {
      return getters.totalPizzaPrice + getters.totalMiscPrice;
    },
    normalizedPizzas(state) {
      return state.pizzas.map((pizza) => {
        return {
          name: pizza.name,
          sauceId: pizza.sauce,
          doughId: pizza.dough,
          sizeId: pizza.size,
          quantity: pizza.quantity,
          ingredients: getFillingArrayFromObject(pizza.filling),
        };
      });
    },
    normalizedMisc(state) {
      return Object.entries(state.misc).map((miscItem) => {
        return {
          miscId: miscItem[0],
          quantity: miscItem[1],
        };
      });
    },
    order(state, getters, rootState) {
      return {
        userId: rootState.Auth?.user?.id || null,
        phone: state.phone,
        address: state.address,
        pizzas: getters.normalizedPizzas,
        misc: getters.normalizedMisc,
      };
    },
  },
  mutations: {
    addPizza(state, newPizza) {
      const samePizzaIndex = state.pizzas
        ? state.pizzas.findIndex((pizza) => pizza.id === newPizza.id)
        : null;
      if (samePizzaIndex !== -1) {
        for (let prop in newPizza) {
          Vue.set(state.pizzas[samePizzaIndex], prop, newPizza[prop]);
        }
      } else {
        Object.assign(newPizza, { quantity: 1 });
        state.pizzas.push(newPizza);
      }
      console.log(state.pizzas);
    },
    addPizzas(state, pizzas) {
      state.pizzas = pizzas;
    },
    addMiscs(state, miscs) {
      state.misc = miscs;
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
      if (samePizzaIndex !== null) {
        let quantity = state.pizzas[samePizzaIndex][`quantity`];
        Vue.set(state.pizzas[samePizzaIndex], `quantity`, quantity + 1);
      }
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
        let quantity = state.pizzas[samePizzaIndex][`quantity`];
        Vue.set(state.pizzas[samePizzaIndex], `quantity`, quantity - 1);
      }
    },
    plusOneMiscItem(state, miscId) {
      let quantity;
      if (state.misc[miscId] !== undefined) {
        quantity = state.misc[miscId] + 1;
      } else {
        quantity = 1;
      }
      Vue.set(state.misc, miscId, quantity);
    },
    minusOneMiscItem(state, miscId) {
      if (state.misc[miscId] !== undefined) {
        const quantity = state.misc[miscId] - 1;
        Vue.set(state.misc, miscId, quantity);
      }
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
    setAddress(state, address) {
      state.address = address;
    },
    setAddressOption(state, addressOption) {
      state.addressOption = addressOption;
    },
    setPhone(state, phone) {
      state.phone = phone;
    },
    toggleSuccessPopup(state, isShown) {
      state.isSuccessPopupShown = isShown;
    },
  },
  actions: {
    addPizza(context, pizza) {
      context.commit("addPizza", pizza);
    },
    addPizzas(context, order) {
      const { pizzas, miscs, addressOption, address } = order;
      context.commit("addPizzas", pizzas);
      context.commit("addMiscs", miscs);
      context.commit("setAddressOption", addressOption);
      context.commit("setAddress", address);
    },
    setAddressOption(context, addressOption) {
      context.commit("setAddressOption", addressOption);
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
    plusOneMiscItem(context, miscId) {
      context.commit("plusOneMiscItem", miscId);
    },
    minusOneMiscItem(context, miscId) {
      context.commit("minusOneMiscItem", miscId);
    },
    resetState(context) {
      context.commit("resetState");
    },
    setAddress(context, address) {
      context.commit("setAddress", address);
    },
    setPhone(context, phone) {
      context.commit("setPhone", phone);
    },
    toggleSuccessPopup(context, isShown) {
      context.commit("toggleSuccessPopup", isShown);
    },
  },
};
