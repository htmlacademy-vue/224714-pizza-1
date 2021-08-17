<template>
  <div
    :class="`pizza__filling pizza__filling--${fillingItem} ${fillingCssClass}`"
  ></div>
</template>

<script>
import { pizzaFillingMultipleClassMapping } from "@/common/helpers";

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
    fillingCssClass() {
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
