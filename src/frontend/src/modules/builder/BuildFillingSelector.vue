<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <BuildFillingListItem
        v-for="(ingredient, i) in ingredients"
        :key="i"
        :ingredient="ingredient"
        @changeFilling="$emit(`changeFilling`, $event)"
      ></BuildFillingListItem>
    </ul>
  </div>
</template>

<script>
import BuildFillingListItem from "./BuildFillingListItem";
export default {
  name: "BuildFillingSelector",
  components: { BuildFillingListItem },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
