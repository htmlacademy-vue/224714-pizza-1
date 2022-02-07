<template>
  <div class="popup">
    <a
      href="#"
      class="close"
      data-test="btn-close"
      @click.prevent="redirect">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a
        href="#"
        class="button"
        data-test="btn-wait"
        @click.prevent="redirect"
      >Отлично, я жду!</a
      >
    </div>
  </div>
</template>

<script>
import { auth } from "@/middlewares";

export default {
  name: "CartPopup",
  layout: "AppLayoutProfile",
  middlewares: [auth],
  methods: {
    redirect() {
      this.$store.dispatch("Cart/toggleSuccessPopup", false);
      if (this.$store.state.Auth.isAuthenticated) {
        this.$router.push({ path: `/orders` });
      } else {
        this.$router.push({ path: `/` });
      }
      this.$store.dispatch("Builder/resetState");
      this.$store.dispatch("Cart/resetState");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/blocks/close.scss";
</style>
