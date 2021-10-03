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
import { doughClassMapping } from "@/common/helpers";
import { mapState } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: { BuilderFillingItemVisualization, AppDrop },
  methods: {
    addIngredientToPizzaPicture(ingredient) {
      this.$store.dispatch("Builder/plusOneIngredient", ingredient.value);
    },
  },
  computed: {
    ...mapState("Builder", ["dough", "sauce", "filling"]),
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
