<template>
  <span :class="`filling filling--${ingredientValue}`">{{
    ingredientName
  }}</span>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    ingredientName: {
      type: String,
      required: true,
    },

    ingredientValue: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
