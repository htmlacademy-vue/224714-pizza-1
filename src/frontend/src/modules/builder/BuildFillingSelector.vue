<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="(ingredient, i) in ingredients"
        :key="i"
      >
        <SelectorItem
          :ingredient-value="ingredient.value"
          :ingredient-name="ingredient.name"
        ></SelectorItem>
        <ItemCounter :name="`ingredients`"></ItemCounter>
      </li>
    </ul>
  </div>
</template>

<script>
import ItemCounter from "../../components/ItemCounter";
import SelectorItem from "../../components/SelectorItem";
export default {
  name: "BuildFillingSelector",
  components: { SelectorItem, ItemCounter },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
