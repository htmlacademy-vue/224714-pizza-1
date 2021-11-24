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
  },
};
