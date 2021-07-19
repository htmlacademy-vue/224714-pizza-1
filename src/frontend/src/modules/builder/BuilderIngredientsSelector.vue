<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>
      <div class="sheet__content ingridients">
        <div class="ingridients__filling">
          <BuildSaucesSelector :sauces="sauces"></BuildSaucesSelector>
          <BuildFillingSelector
            :ingredients="ingredients"
          ></BuildFillingSelector>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuildSaucesSelector from "@/modules/builder/BuildSaucesSelector";
import BuildFillingSelector from "@/modules/builder/BuildFillingSelector";
export default {
  name: "BuilderIngredientsSelector",
  components: {
    BuildFillingSelector,
    BuildSaucesSelector,
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
