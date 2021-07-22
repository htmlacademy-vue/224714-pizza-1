<template>
  <div :class="`pizza__filling pizza__filling--${ingredient}`"></div>
</template>

<script>
export default {
  name: "BuilderFillingItemVisualization",
  props: {
    ingredient: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
