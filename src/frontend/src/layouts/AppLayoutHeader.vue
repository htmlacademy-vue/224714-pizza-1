<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ price }} ₽</router-link>
    </div>
    <div class="header__user" v-if="!isAuthenticated">
      <a class="header__login" @click="showLogin">
        <span>Войти</span>
      </a>
    </div>
    <div class="header__user" v-else>
      <router-link to="/profile">
        <picture>
          <source type="image/webp" :srcset="user.avatar" />
          <img
            :src="user.avatar"
            :srcset="user.avatar"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a class="header__logout" @click="logout">
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppLayoutHeader",
  created() {},
  computed: {
    ...mapState("Auth", ["user"]),
    price() {
      return this.$store.getters["Cart/totalPrice"] || 0;
    },
    isAuthenticated() {
      return this.$store.state.Auth.isAuthenticated;
    },
  },
  methods: {
    showLogin() {
      if (this.$route.path === "/") {
        this.$router.push({
          name: "LoginModal",
          params: { "from-main": "true" },
        });
      } else {
        this.$router.push("/login");
      }
    },
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

<style scoped></style>
