<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button button--disabled"
      :disabled="!isBtnActive"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    price: {
      type: Number,
      default: 0,
    },
    isBtnActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
