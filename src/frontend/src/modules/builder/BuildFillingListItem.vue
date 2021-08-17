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
      :ingredient="ingredient.value"
      @valueChanged="$emit(`changeFilling`, $event)"
      @disableDragging="isDraggable = !$event"
    ></ItemCounter>
  </li>
</template>

<script>
import ItemCounter from "@/components/ItemCounter";
import SelectorItem from "@/components/SelectorItem";
import AppDrag from "@/components/AppDrag";

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
      isDraggable: true,
    };
  },
};
</script>

<style scoped></style>
