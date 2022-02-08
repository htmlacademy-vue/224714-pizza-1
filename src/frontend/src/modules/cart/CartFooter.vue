<template>
  <section class="footer">
    <div class="footer__more">
      <a
        class="button button--border button--arrow"
        data-test="one-more"
        @click="makeOneMorePizza"
      >
        Хочу еще одну
      </a>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ $store.getters[`Cart/totalPrice`] }} ₽</b>
    </div>

    <div class="footer__submit">
      <button
        type="submit"
        class="button">Оформить заказ</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "CartFooter",
  methods: {
    makeOneMorePizza() {
      this.$store.dispatch("Builder/resetState");
      this.$router.push(`/`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/blocks/button.scss";
@import "@/assets/scss/blocks/footer.scss";
</style>
