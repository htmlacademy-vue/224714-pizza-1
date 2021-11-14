export default {
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: false,
  },
  getters: {
    getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",
  },
  mutations: {
    setAuthentication(state, payload) {
      state.isAuthenticated = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },
    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit("setAuthentication", false);
      commit("setUser", null);
    },
    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit("setAuthentication", true);
        commit("setUser", data);
      } catch {
        // Note: in case of not proper login, i.e. token is expired
        dispatch("logout", false);
      }
    },
    setAuthentication(context, payload) {
      context.commit("setAuthentication", payload);
    },
    setUser(context, payload) {
      context.commit("setUser", payload);
    },
  },
};
