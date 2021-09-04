<template>
  <header class="header">
    <div class="header__logo">
      <a @click="$router.push('/')" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a @click="$router.push({ name: 'Cart' })">{{ price }} ₽</a>
    </div>
    <div class="header__user" v-if="!isLogged">
      <a class="header__login" @click="$router.push(`${loginLink}`)"
        ><span>Войти</span></a
      >
    </div>
    <div class="header__user" v-else>
      <a @click="$router.push(`/profile`)">
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
      </a>
      <a href="#" class="header__logout"><span>Выйти</span></a>
    </div>
  </header>
</template>

<script>
import EventBus from "@/common/event-bus";
export default {
  name: "AppLayoutHeader",
  data() {
    return {
      isLogged: false,
      price: 0,
    };
  },
  created() {
    EventBus.$on("priceChanged", (newPrice) => {
      this.price = newPrice;
    });
  },
  computed: {
    loginLink() {
      return this.$route.path === "/" ? "/login-modal" : "/login";
    },
  },
};
</script>

<style scoped></style>
