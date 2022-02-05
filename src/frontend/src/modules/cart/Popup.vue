<template>
  <div class="popup">
    <a href="#" class="close" @click.prevent="redirect" data-test="btn-close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click.prevent="redirect" data-test="btn-wait"
        >Отлично, я жду!</a
      >
    </div>
  </div>
</template>

<script>
import { auth } from "@/middlewares";

export default {
  name: "Popup",
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

<style scoped></style>
