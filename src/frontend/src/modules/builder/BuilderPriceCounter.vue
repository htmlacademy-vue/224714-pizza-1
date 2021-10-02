<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button type="button" class="button" :disabled="!isBtnActive">
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  props: {
    isBtnActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("Builder", {
      price: "price",
    }),
  },
};
</script>

<style scoped></style>
