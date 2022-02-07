<template>
  <div
    :class="`pizza__filling pizza__filling--${fillingName} ${fillingCssQuantity}`"
  ></div>
</template>

<script>
import {
  pizzaFillingMultipleClassMapping,
  getIngredientValueById,
} from "@/common/helpers";

export default {
  name: "BuilderFillingItemVisualization",
  props: {
    fillingItem: {
      type: String,
      required: true,
    },

    filling: {
      type: Object,
      required: true,
    },
  },

  computed: {
    fillingName() {
      return getIngredientValueById(
        this.$store.state.pizza.ingredients,
        this.fillingItem
      );
    },

    fillingCssQuantity() {
      const fillingCount = this.filling[this.fillingItem];
      return pizzaFillingMultipleClassMapping[fillingCount] || ``;
    },
  },
};
</script>

<style scoped></style>
