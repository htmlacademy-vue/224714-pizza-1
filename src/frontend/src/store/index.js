import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

// import jsonUser from "@/static/user.json";

Vue.use(Vuex);

const state = () => ({});

const getters = {};

const actions = {
  // async init({ dispatch }) {
  //   dispatch('fetchUsers');
  //   dispatch('Columns/query');
  //   dispatch('Tasks/query');
  // },
};

const mutations = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
});
