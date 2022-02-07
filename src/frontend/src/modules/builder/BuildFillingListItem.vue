<template>
  <li class="ingredients__item">
    <AppDrag :transfer-data="ingredient" :draggable="isDraggable">
      <AppSelectorItem
        :ingredient-value="ingredient.value"
        :ingredient-name="ingredient.name"
      />
    </AppDrag>
    <AppCounter
      :name="`ingredients`"
      :value="value"
      :min-value="minValue"
      :max-value="maxValue"
      data-test="counter"
      @plusOne="plusOne()"
      @minusOne="minusOne()"
    />
  </li>
</template>

<script>
import AppCounter from "@/components/AppCounter";
import AppSelectorItem from "@/components/AppSelectorItem";
import AppDrag from "@/components/AppDrag";
import {
  FILLING_COUNTER_MAX_VALUE,
  FILLING_COUNTER_MIN_VALUE,
} from "@/common/const";

export default {
  name: "BuildFillingListItem",
  components: { AppCounter, AppSelectorItem, AppDrag },
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
