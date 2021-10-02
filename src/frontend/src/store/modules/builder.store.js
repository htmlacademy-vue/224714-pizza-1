import { doughMap, ingredientMap, sauceMap, sizeMap } from "@/common/helpers";
import { calculateFilling } from "@/common/helpers";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    dough: ``,
    sauce: ``,
    size: ``,
    filling: {},
    ingredients: [],
    pizzaName: ``,
  },
  getters: {
    doughs(state, getters, rootState) {
      if (rootState.pizza.dough) {
        return rootState.pizza.dough.map((doughItem, index) => {
          return {
            name: doughItem.name,
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
            image: sizeItem.image,
            multiplier: sizeItem.multiplier,
            value: sizeMap.find(
              (item) => item.multiplier === sizeItem.multiplier
            ).value,
            isChecked: index === 1,
          };
        });
      }
    },
    sauces(state, getters, rootState) {
      if (rootState.pizza.sauces) {
        return rootState.pizza.sauces.map((sauceItem, index) => {
          return {
            name: sauceItem.name,
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
            price: ingredientItem.price,
            value: ingredientMap.find(
              (item) => item.name === ingredientItem.name
            ).value,
          };
        });
      }
    },
    price(state, getters) {
      let doughPrice =
        getters.doughs && state.dough
          ? getters.doughs.find((dough) => dough.value === state.dough).price
          : 0;
      let saucePrice =
        getters.sauces && state.sauce
          ? getters.sauces.find((sauce) => sauce.value === state.sauce).price
          : 0;
      let multiplier =
        getters.sizes && state.size
          ? getters.sizes.find((size) => size.value === state.size).multiplier
          : 1;
      let fillingPrice = calculateFilling(state.filling, getters.ingredients);
      let totalPrice = multiplier * (doughPrice + saucePrice + fillingPrice);
      return totalPrice;
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
    setSize(state, payload) {
      state.size = payload;
    },
    setFilling(state, payload) {
      Vue.set(state.filling, payload.name, payload.value);
    },
  },
  actions: {
    setDough(context, payload) {
      context.commit("setDough", payload);
    },
    setSauce(context, payload) {
      context.commit("setSauce", payload);
    },
    setSize(context, payload) {
      context.commit("setSize", payload);
    },
    setFilling(context, payload) {
      context.commit("setFilling", payload);
    },
  },
};
