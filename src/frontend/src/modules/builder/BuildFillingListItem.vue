<template>
  <li class="ingredients__item">
    <AppDrag :transfer-data="ingredient" :draggable="isDraggable">
      <SelectorItem
        :ingredient-value="ingredient.value"
        :ingredient-name="ingredient.name"
      ></SelectorItem>
    </AppDrag>
    <ItemCounter
      :name="`ingredients`"
      :value="value"
      :ingredient="ingredient.value"
      @plusOne="plusOne($event)"
      @minusOne="minusOne($event)"
    ></ItemCounter>
  </li>
</template>

<script>
import ItemCounter from "@/components/ItemCounter";
import SelectorItem from "@/components/SelectorItem";
import AppDrag from "@/components/AppDrag";
import { FILLING_COUNTER_MAX_VALUE } from "@/common/const";

export default {
  name: "BuildFillingListItem",
  components: { SelectorItem, ItemCounter, AppDrag },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  methods: {
    plusOne(ingredient) {
      if (ingredient === this.ingredient.value) {
        this.$store.dispatch("Builder/plusOneIngredient", ingredient);
      }
    },
    minusOne(ingredient) {
      if (ingredient === this.ingredient.value) {
        this.$store.dispatch("Builder/minusOneIngredient", ingredient);
      }
    },
  },
  computed: {
    isDraggable() {
      return (
        this.$store.state.Builder.filling[this.ingredient.value] !==
        FILLING_COUNTER_MAX_VALUE
      );
    },
    value() {
      return this.$store.state.Builder.filling[this.ingredient.value] || 0;
    },
  },
};
</script>

<style scoped></style>
