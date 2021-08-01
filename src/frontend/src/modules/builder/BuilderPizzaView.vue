<template>
  <AppDrop
    class="content__constructor"
    @drop="addIngredientToPizzaPicture($event)"
  >
    <div :class="`pizza ${pizzaCssClass}`">
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
import EventBus from "@/common/event-bus";

export default {
  name: "BuilderPizzaView",
  components: { BuilderFillingItemVisualization, AppDrop },
  props: {
    pizzaCssClass: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      Ingredients: [],
    };
  },
  methods: {
    addIngredientToPizzaPicture(ingredient) {
      this.Ingredients.push(ingredient.value);
      EventBus.$emit("ingredientDropped", ingredient.value);
    },
  },
};
</script>

<style scoped></style>
