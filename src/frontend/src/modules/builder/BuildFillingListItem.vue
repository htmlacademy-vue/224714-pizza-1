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
      :minValue="minValue"
      :maxValue="maxValue"
      @plusOne="plusOne()"
      @minusOne="minusOne()"
      data-test="counter"
    ></ItemCounter>
  </li>
</template>

<script>
import ItemCounter from "@/components/AppCounter";
import SelectorItem from "@/components/AppSelectorItem";
import AppDrag from "@/components/AppDrag";
import {
  FILLING_COUNTER_MAX_VALUE,
  FILLING_COUNTER_MIN_VALUE,
} from "@/common/const";

export default {
  name: "BuildFillingListItem",
  components: { SelectorItem, ItemCounter, AppDrag },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      minValue: FILLING_COUNTER_MIN_VALUE,
      maxValue: FILLING_COUNTER_MAX_VALUE,
    };
  },
  computed: {
    isDraggable() {
      return (
        this.$store.state.Builder.filling[this.ingredient.id] !==
        FILLING_COUNTER_MAX_VALUE
      );
    },

    value() {
      return this.$store.state.Builder.filling[this.ingredient.id] || 0;
    },
  },
  methods: {
    plusOne() {
      this.$store.dispatch("Builder/plusOneIngredient", this.ingredient.id);
    },

    minusOne() {
      this.$store.dispatch("Builder/minusOneIngredient", this.ingredient.id);
    },
  },
};
</script>

<style scoped></style>
