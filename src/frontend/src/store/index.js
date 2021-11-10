import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

import miscData from "@/static/misc.json";
import VuexPlugins from "@/plugins/vuexPlugins";

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
  async fetchPizza() {
    let pizza = {};
    pizza.dough = await this.$api.dough.query();
    pizza.ingredients = await this.$api.ingredients.query();
    pizza.sauces = await this.$api.sauces.query();
    pizza.sizes = await this.$api.sizes.query();
    // Promise.all([this.$api.dough.query(), this.$api.ingredients.query()]).then((data) => {
    //
    // });
    // const pizza = pizzaData; // TODO: Add api call
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
  plugins: [VuexPlugins],
  modules,
});
