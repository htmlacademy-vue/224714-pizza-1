<template>
  <div class="ingridients__filling">
    <p>Начинка:</p>

    <ul class="ingridients__list">
      <li
        class="ingridients__item"
        v-for="(ingredient, i) in ingredients"
        :key="i"
      >
        <SelectorItem
          :ingredient-value="ingredient.value"
          :ingredient-name="ingredient.name"
        ></SelectorItem>
        <ItemCounter :name="`ingridients`"></ItemCounter>
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
