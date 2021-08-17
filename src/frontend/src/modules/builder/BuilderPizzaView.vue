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
import { doughClassMapping } from "@/common/helpers";

export default {
  name: "BuilderPizzaView",
  components: { BuilderFillingItemVisualization, AppDrop },
  props: {
    dough: {
      type: String,
      required: true,
    },
    sauce: {
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
  computed: {
    pizzaCssClass() {
      return `pizza--foundation--${doughClassMapping[this.dough]}-${
        this.sauce
      }`;
    },
  },
};
</script>

<style scoped></style>
