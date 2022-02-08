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

<style lang="scss" scoped>
.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}

</style>
<style lang="scss" scoped>
@import "@/assets/scss/blocks/input.scss";
@import "@/assets/scss/blocks/button.scss";
</style>
