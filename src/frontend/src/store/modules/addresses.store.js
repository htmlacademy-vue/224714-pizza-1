export default {
  namespaced: true,
  state: {
    addresses: [],
  },
  getters: {},
  mutations: {
    setAddresses(state, payload) {
      state.addresses = [...payload];
    },
  },
  actions: {
    async getAddresses({ commit }) {
      const addresses = await this.$api.addresses.query();
      commit("setAddresses", addresses);
    },
    async addAddress({ dispatch }, newAddress) {
      await this.$api.addresses.post(newAddress);
      dispatch("getAddresses");
    },
    async removeAddress({ dispatch }, id) {
      await this.$api.addresses.delete(id);
      dispatch("getAddresses");
    },
    async editAddress({ dispatch }, address) {
      await this.$api.addresses.put(address);
      dispatch("getAddresses");
    },
  },
};
