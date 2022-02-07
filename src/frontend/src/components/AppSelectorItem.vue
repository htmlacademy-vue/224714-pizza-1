<template>
  <span :class="`filling filling--${ingredientValue}`">{{
    ingredientName
  }}</span>
</template>

<script>
export default {
  name: "AppSelectorItem",
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

<style lang="scss" scoped>
@import "@/assets/scss/blocks/select.scss";
</style>
