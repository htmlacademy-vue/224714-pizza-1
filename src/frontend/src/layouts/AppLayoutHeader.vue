<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" data-test="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart" data-test="price">{{ price }} ₽</router-link>
    </div>
    <div v-if="!isAuthenticated" key="header-user" class="header__user">
      <router-link class="header__login" :to="loginLink" data-test="login-link"
        ><span>Войти</span></router-link
      >
    </div>
    <div v-else key="header-user" class="header__user" data-test="header__user">
      <router-link to="/profile">
        <picture>
          <source type="image/webp" :srcset="user.avatar" />
          <img
            :src="user.avatar"
            :srcset="user.avatar"
            alt="Василий Ложкин"
            width="32"
            height="32"
            data-test="user-avatar"
          />
        </picture>
        <span data-test="user-name">{{ user.name }}</span>
      </router-link>
      <a class="header__logout" data-test="header__logout" @click="logout">
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapState("Auth", ["user"]),

    loginLink() {
      return this.$route.path === "/" ? "/loginmodal" : "/login";
    },

    price() {
      return this.$store.getters["Cart/totalPrice"] || 0;
    },

    isAuthenticated() {
      return this.$store.state.Auth.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      if (this.$route.path !== "/") {
        await this.$router.push("/");
      }
      await this.$store.dispatch("Auth/logout");
      await this.$store.dispatch("Cart/resetState");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/blocks/logo.scss";
</style>
