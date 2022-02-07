<template>
  <AppDrop
    ref="app-drop"
    class="content__constructor"
    @drop="addIngredientToPizzaPicture($event)"
  >
    <div :class="`pizza ${pizzaCssClass}`" data-test="pizza">
      <div class="pizza__wrapper">
        <transition-group name="ingredients">
          <BuilderFillingItemVisualization
            v-for="fillingItem in fillingItems"
            :key="`${fillingItem}-${filling[fillingItem]}`"
            :fillingItem="fillingItem"
            :filling="filling"
            data-test="filling-item"
          />
        </transition-group>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/components/AppDrop";
import BuilderFillingItemVisualization from "./BuilderFillingItemVisualization";
import {
  doughClassMapping,
  getNameById,
  sauceMapEnglishByName,
} from "@/common/helpers";
import { mapState } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: { BuilderFillingItemVisualization, AppDrop },
  computed: {
    ...mapState("Builder", ["dough", "sauce", "filling"]),

    fillingItems() {
      return Object.keys(this.filling).filter(
        (fillingName) => this.filling[fillingName] !== 0
      );
    },

    pizzaCssClass() {
      return this.dough && this.sauce
        ? `pizza--foundation--${
            doughClassMapping[
              getNameById(this.$store.state.pizza.dough, this.dough)
            ]
          }-${
            sauceMapEnglishByName[
              getNameById(this.$store.state.pizza.sauces, this.sauce)
            ]
          }`
        : ``;
    },
  },
  methods: {
    addIngredientToPizzaPicture(ingredient) {
      this.$store.dispatch("Builder/plusOneIngredient", ingredient.id);
    },
  },
};
</script>

<style scoped>
.ingredients-enter-active,
.ingredients-leave-active {
  transition: all 0.5s ease;
}
.ingredients-enter,
.ingredients-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
