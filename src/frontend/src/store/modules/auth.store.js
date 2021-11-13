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
    async login(context, dispatch) {
      const data = await this.$api.auth.login();
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },
    async logout(context, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      context("setAuthentication", false);
      context("setUser", null);
    },
    async getMe(context, dispatch) {
      try {
        const data = await this.$api.auth.getMe();
        context("setAuthentication", true);
        context("setUser", data);
      } catch {
        // Note: in case of not proper login, i.e. token is expired
        dispatch("logout", false);
      }
    },
  },
};
