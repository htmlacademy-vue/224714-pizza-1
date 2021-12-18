<template>
  <div
    :class="`pizza__filling pizza__filling--${fillingName} ${fillingCssQuantity}`"
  ></div>
</template>

<script>
import {
  pizzaFillingMultipleClassMapping,
  getValueById,
  ingredientMap,
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
      return getValueById(ingredientMap, this.fillingItem);
    },
    fillingCssQuantity() {
      let fillingCount;
      Object.keys(this.filling).find((fillingItem) => {
        if (fillingItem === this.fillingItem) {
          fillingCount = this.filling[fillingItem];
        }
      });
      return pizzaFillingMultipleClassMapping[fillingCount] || ``;
    },
  },
};
</script>

<style scoped></style>
