import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

import miscData from "@/static/misc.json";
import pizzaData from "@/static/pizza.json";
import userData from "@/static/user.json";

Vue.use(Vuex);

const state = () => ({
  user: {},
  pizza: {},
  users: {},
});

const getters = {};

const actions = {
  async init({ dispatch }) {
    dispatch("fetchMisc");
    dispatch("fetchPizza");
    dispatch("fetchUsers");
  },
  fetchMisc() {
    const miscellaneous = miscData; // TODO: Add api call
    this.commit("SET_MISC", miscellaneous);
  },
  fetchPizza() {
    const pizza = pizzaData; // TODO: Add api call
    this.commit("SET_PIZZA", pizza);
  },
  fetchUsers() {
    const users = userData; // TODO: Add api call
    this.commit("SET_USERS", users);
  },
};

const mutations = {
  SET_MISC(state, payload) {
    state.misc = payload;
  },
  SET_PIZZA(state, payload) {
    state.pizza = payload;
  },
  SET_USERS(state, payload) {
    state.user = payload;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
});
