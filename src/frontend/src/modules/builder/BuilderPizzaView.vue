<template>
  <AppDrop
    class="content__constructor"
    @drop="addIngredientToPizzaPicture($event)"
  >
    <div :class="`pizza ${pizzaCssClass}`">
      <div class="pizza__wrapper">
        <BuilderFillingItemVisualization
          v-for="(fillingItem, i) in fillingItems"
          :key="i"
          :fillingItem="fillingItem"
          :filling="filling"
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
    filling: {
      type: Object,
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
    fillingItems() {
      return Object.keys(this.filling).filter(
        (fillingName) => this.filling[fillingName] !== 0
      );
    },
    pizzaCssClass() {
      return `pizza--foundation--${doughClassMapping[this.dough]}-${
        this.sauce
      }`;
    },
  },
};
</script>

<style scoped></style>
