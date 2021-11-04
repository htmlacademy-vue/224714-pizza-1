import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

import miscData from "@/static/misc.json";
import pizzaData from "@/static/pizza.json";

Vue.use(Vuex);

const state = () => ({
  pizza: {},
  misc: [],
});

const getters = {};

const actions = {
  async init({ dispatch }) {
    dispatch("fetchMisc");
    dispatch("fetchPizza");
  },
  fetchMisc() {
    const miscellaneous = miscData; // TODO: Add api call
    this.commit("SET_MISC", miscellaneous);
  },
  fetchPizza() {
    console.log(this.$api);
    // Promise.all([this.api.getOffers(), api.getDestinations(), api.getPoints()]).then((data) => {
    //   const [offers, destinations, points] = data;
    //
    // });
    const pizza = pizzaData; // TODO: Add api call
    this.commit("SET_PIZZA", pizza);
  },
};

const mutations = {
  SET_MISC(state, payload) {
    state.misc = payload;
  },
  SET_PIZZA(state, payload) {
    state.pizza = payload;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
});
