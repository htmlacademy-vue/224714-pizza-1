import {
  doughMap,
  ingredientMap,
  sauceMap,
  sizeMap,
  calculateFilling,
} from "@/common/helpers";
import Vue from "vue";
import { defaultSizeArrayIndex } from "@/common/const";

const getDefaultState = () => {
  return {
    dough: ``,
    sauce: ``,
    size: ``,
    filling: {},
    pizzaName: ``,
    id: null,
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    doughs(state, getters, rootState) {
      if (rootState.pizza.dough) {
        return rootState.pizza.dough.map((doughItem, index) => {
          return {
            name: doughItem.name,
            id: doughItem.id,
            image: doughItem.image,
            description: doughItem.description,
            price: doughItem.price,
            value: doughMap.find((item) => item.name === doughItem.name).value,
            isChecked: index === 0,
          };
        });
      }
    },
    sizes(state, getters, rootState) {
      if (rootState.pizza.sizes) {
        return rootState.pizza.sizes.map((sizeItem, index) => {
          return {
            name: sizeItem.name,
            id: sizeItem.id,
            image: sizeItem.image,
            multiplier: sizeItem.multiplier,
            value: sizeMap.find(
              (item) => item.multiplier === sizeItem.multiplier
            ).value,
            isChecked: index === defaultSizeArrayIndex,
          };
        });
      }
    },
    sauces(state, getters, rootState) {
      if (rootState.pizza.sauces) {
        return rootState.pizza.sauces.map((sauceItem, index) => {
          return {
            name: sauceItem.name,
            id: sauceItem.id,
            price: sauceItem.price,
            value: sauceMap.find((item) => item.name === sauceItem.name).value,
            isChecked: index === 0,
          };
        });
      }
    },
    ingredients(state, getters, rootState) {
      if (rootState.pizza.ingredients) {
        return rootState.pizza.ingredients.map((ingredientItem) => {
          return {
            name: ingredientItem.name,
            id: ingredientItem.id,
            price: ingredientItem.price,
            value: ingredientMap[ingredientItem.name],
          };
        });
      }
    },
    price(state, getters) {
      let doughPrice =
        getters.doughs && state.dough
          ? getters.doughs.find((dough) => dough.id === state.dough).price
          : 0;
      let saucePrice =
        getters.sauces && state.sauce
          ? getters.sauces.find((sauce) => sauce.id === state.sauce).price
          : 0;
      let multiplier =
        getters.sizes && state.size
          ? getters.sizes.find((size) => size.id === state.size).multiplier
          : 1;
      let fillingPrice = calculateFilling(
        state.filling,
        getters.ingredients,
        true
      );
      return multiplier * (doughPrice + saucePrice + fillingPrice);
    },
    pizza(state, getters) {
      return {
        name: state.pizzaName,
        sauce: state.sauce,
        dough: state.dough,
        size: state.size,
        price: getters.price,
        filling: state.filling,
        id: state.id ? state.id : new Date().getTime(),
      };
    },
  },
  mutations: {
    setPrice(state, payload) {
      state.price = payload;
    },
    setDough(state, payload) {
      state.dough = payload;
    },
    setSauce(state, payload) {
      state.sauce = payload;
    },
    setDiameter(state, payload) {
      state.size = payload;
    },
    setFilling(state, payload) {
      Vue.set(state.filling, payload.name, payload.value);
    },
    setPizzaName(state, payload) {
      state.pizzaName = payload;
    },
    setId(state, payload) {
      state.id = payload;
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
    plusOneIngredient(state, payload) {
      const value = state.filling[payload] ? state.filling[payload] : 0;
      Vue.set(state.filling, payload, value + 1);
    },
    minusOneIngredient(state, payload) {
      const value = state.filling[payload] ? state.filling[payload] : 0;
      if (value - 1 <= 0) {
        Vue.delete(state.filling, payload);
      } else {
        Vue.set(state.filling, payload, value - 1);
      }
    },
  },
  actions: {
    setDough(context, payload) {
      context.commit("setDough", payload);
    },
    setSauce(context, payload) {
      context.commit("setSauce", payload);
    },
    setDiameter(context, payload) {
      context.commit("setDiameter", payload);
    },
    setFilling(context, payload) {
      context.commit("setFilling", payload);
    },
    setPizzaName(context, payload) {
      context.commit("setPizzaName", payload);
    },
    setId(context, payload) {
      context.commit("setId", payload);
    },
    plusOneIngredient(context, payload) {
      context.commit("plusOneIngredient", payload);
    },
    minusOneIngredient(context, payload) {
      context.commit("minusOneIngredient", payload);
    },
    plusOnePizza(context) {
      context.commit("plusOnePizza");
    },
    minusOnePizza(context) {
      context.commit("minusOnePizza");
    },
    resetState(context) {
      context.commit("resetState");
    },
    loadPizza(context, pizza) {
      context.commit("resetState");
      context.commit("setDough", pizza.dough);
      context.commit("setSauce", pizza.sauce);
      context.commit("setDiameter", pizza.size);
      context.commit("setPizzaName", pizza.name);
      context.commit("setId", pizza.id);
      for (let fillingName in pizza.filling) {
        context.commit("setFilling", {
          name: fillingName,
          value: pizza.filling[fillingName],
        });
      }
    },
  },
};
