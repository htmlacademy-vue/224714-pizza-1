import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import {
  DEFAULT_DOUGH_ARRAY_INDEX,
  DEFAULT_SAUCE_ARRAY_INDEX,
  DEFAULT_SIZE_ARRAY_INDEX,
  MESSAGE_LIVE_TIME,
} from "@/common/const";

import VuexPlugins from "@/plugins/vuexPlugins";

Vue.use(Vuex);

const state = () => ({
  pizza: {},
  misc: [],
  notifications: [],
});

const getters = {};

export const actions = {
  async init({ dispatch }) {
    dispatch("fetchMisc");
    dispatch("fetchPizza");
  },
  async fetchMisc() {
    const miscellaneous = await this.$api.misc.query();
    this.commit("SET_MISC", miscellaneous);
  },
  async fetchPizza() {
    const [dough, ingredients, sauces, sizes] = await Promise.all([
      this.$api.dough.query(),
      this.$api.ingredients.query(),
      this.$api.sauces.query(),
      this.$api.sizes.query(),
    ]);
    const pizza = {
      dough,
      ingredients,
      sauces,
      sizes,
    };
    const defaultSizeId = sizes[DEFAULT_SIZE_ARRAY_INDEX].id;
    this.commit("Builder/setDiameter", defaultSizeId, { root: true });
    const defaultSauceId = sauces[DEFAULT_SAUCE_ARRAY_INDEX].id;
    this.commit("Builder/setSauce", defaultSauceId, { root: true });
    const defaultDoughId = sizes[DEFAULT_DOUGH_ARRAY_INDEX].id;
    this.commit("Builder/setDough", defaultDoughId, { root: true });

    this.commit("SET_PIZZA", pizza);
  },
  async createNotification({ ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: new Date(),
    };
    this.commit("ADD_NOTIFICATION", uniqueNotification);
    setTimeout(
      () => this.commit("DELETE_NOTIFICATION", uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

export const mutations = {
  SET_MISC(state, payload) {
    state.misc = payload;
  },
  SET_PIZZA(state, payload) {
    state.pizza = payload;
  },
  ADD_NOTIFICATION(state, notification) {
    state.notifications = [...state.notifications, notification];
  },
  DELETE_NOTIFICATION(state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id
    );
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
