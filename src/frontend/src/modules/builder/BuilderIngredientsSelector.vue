<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__filling">
          <BuildSaucesSelector />
          <BuildFillingSelector />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuildSaucesSelector from "@/modules/builder/BuildSaucesSelector";
import BuildFillingSelector from "@/modules/builder/BuildFillingSelector";
export default {
  name: "BuilderIngredientsSelector",
  components: {
    BuildFillingSelector,
    BuildSaucesSelector,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/blocks/ingredients.scss";
@import "@/assets/scss/blocks/input.scss";
@import "@/assets/scss/blocks/button.scss";
@import "@/assets/scss/blocks/pizza.scss";
</style>
