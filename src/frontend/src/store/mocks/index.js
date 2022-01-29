import { cloneDeep } from "lodash";

import { mutations } from "@/store";
import modules from "@/store/modules";
import Vuex from "vuex";
import user from "@/static/user.json";
import Misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import addresses from "@/store/mocks/addresses.json";

import VuexPlugins from "@/plugins/vuexPlugins";

const initState = () => ({
  pizza: pizza,
  misc: Misc,
  notifications: [],
});

export const generateMockStore = (actions) => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state: initState(),
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};

export const authenticateUser = (store) => {
  store.commit(`Auth/setAuthentication`, true);
  store.commit(`Auth/setUser`, user);
};

export const setAddressOption = (store, value) => {
  store.commit(`Cart/setAddressOption`, value);
};

export const setPhone = (store, phone) => {
  store.commit(`Cart/setPhone`, phone);
};

export const setAddresses = (store) => {
  store.commit(`Addresses/setAddresses`, addresses);
};

export const setAddress = (store, address) => {
  store.commit(`Cart/setAddress`, address);
};

export const addPizzas = (store, pizzas) => {
  store.commit(`Cart/addPizzas`, pizzas);
};

export const addMiscs = (store, misc) => {
  store.commit(`Cart/addMiscs`, misc);
};
