<template>
  <AppDrop
    class="content__constructor"
    @drop="addIngredientToPizzaPicture($event)"
  >
    <div class="pizza pizza--foundation--big-tomato">
      <div class="pizza__wrapper">
        <BuilderFillingItemVisualization
          v-for="(ingredient, i) in Ingredients"
          :key="i"
          :ingredient="ingredient"
        ></BuilderFillingItemVisualization>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/components/AppDrop";
import BuilderFillingItemVisualization from "./BuilderFillingItemVisualization";
export default {
  name: "BuilderPizzaView",
  components: { BuilderFillingItemVisualization, AppDrop },
  data() {
    return {
      Ingredients: [],
    };
  },
  methods: {
    addIngredientToPizzaPicture(ingredient) {
      console.log(ingredient.value);
      this.Ingredients.push(ingredient.value);
      this.$emit('ingredientDropped', ingredient.value);
    },
  },
};
</script>

<style scoped></style>
