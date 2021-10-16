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
    <div class="header__user" v-if="!isLogged">
      <router-link class="header__login" :to="loginLink"
        ><span>Войти</span></router-link
      >
    </div>
    <div class="header__user" v-else>
      <router-link to="/profile">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5.webp 1x,
              img/users/user5@2x.webp       2x
            "
          />
          <img
            src="@/assets/img/users/user5.jpg"
            srcset="@/assets/img/users/user5@2x.jpg"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>Василий Ложкин</span>
      </router-link>
      <router-link to="/" class="header__logout"
        ><span>Выйти</span></router-link
      >
    </div>
  </header>
</template>

<script>

export default {
  name: "AppLayoutHeader",
  data() {
    return {
      isLogged: false,
    };
  },
  created() {},
  computed: {
    // ...mapGetters("Builder", { price: "price" }),
    loginLink() {
      return this.$route.path === "/" ? "/login-modal" : "/login";
    },
    price() {
      return this.$store.getters["Cart/totalPrice"] || 0;
    },
  },
};
</script>

<style scoped></style>
