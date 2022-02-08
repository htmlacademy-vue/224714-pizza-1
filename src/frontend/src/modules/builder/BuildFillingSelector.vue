<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <BuildFillingListItem
        v-for="(ingredient, i) in ingredients"
        :key="i"
        :ingredient="ingredient"
        data-test="list-item"
      />
    </ul>
  </div>
</template>

<script>
import BuildFillingListItem from "./BuildFillingListItem";
import { mapGetters } from "vuex";
export default {
  name: "BuildFillingSelector",
  components: { BuildFillingListItem },
  computed: {
    ...mapGetters("Builder", ["ingredients"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/blocks/ingredients.scss";
@import "@/assets/scss/blocks/input.scss";
@import "@/assets/scss/blocks/button.scss";
</style>
