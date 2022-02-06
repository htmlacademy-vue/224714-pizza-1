<template>
  <div class="content__result">
    <p data-test="price">Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      data-test="btn"
      :disabled="!isBtnActive"
      @click="addPizza"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    isBtnActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    price() {
      return this.$store.getters["Builder/price"];
    },
  },
  methods: {
    addPizza() {
      this.$store.dispatch(
        "Cart/addPizza",
        this.$store.getters["Builder/pizza"]
      );
      this.$router.push({ name: `Cart` });
    },
  },
};
</script>

<style scoped></style>
