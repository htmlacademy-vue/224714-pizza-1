<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="(ingredient, i) in ingredients"
        :key="i"
      >
        <AppDrag :transfer-data="ingredient" :draggable="isDraggable">
          <SelectorItem
            :ingredient-value="ingredient.value"
            :ingredient-name="ingredient.name"
          ></SelectorItem>
        </AppDrag>
        <ItemCounter :name="`ingredients`" v-on="$listeners" @disableDragging="isDraggable = !$event"></ItemCounter>
      </li>
    </ul>
  </div>
</template>

<script>
import ItemCounter from "@/components/ItemCounter";
import SelectorItem from "@/components/SelectorItem";
import AppDrag from "@/components/AppDrag";
export default {
  name: "BuildFillingSelector",
  components: { SelectorItem, ItemCounter, AppDrag },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDraggable: true
    }
  }
};
</script>

<style scoped></style>
