<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!isBtnActive"
      @click="addPizza"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  props: {
    isBtnActive: {
      type: Boolean,
      default: false,
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
  computed: {
    price() {
      return this.$store.getters["Builder/price"];
    },
  },
};
</script>

<style scoped></style>
