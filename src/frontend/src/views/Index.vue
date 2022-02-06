<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector></BuilderDoughSelector>
          <BuilderSizeSelector></BuilderSizeSelector>
          <BuilderIngredientsSelector></BuilderIngredientsSelector>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                :value="pizzaName"
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
                data-test="pizza-name"
                @change="changeName($event.target.value)"
              />
            </label>

            <BuilderPizzaView></BuilderPizzaView>

            <BuilderPriceCounter
              :isBtnActive="isBtnActive"
            ></BuilderPriceCounter>
          </div>
        </div>
      </form>
    </main>
    <router-view></router-view>
  </div>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";
import { mapState } from "vuex";

export default {
  name: "Index",
  layout: "AppLayoutMain",
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPriceCounter,
  },
  computed: {
    ...mapState("Builder", ["filling", "pizzaName"]),

    isFillingEmpty() {
      return Object.keys(this.$store.state.Builder.filling).length === 0;
    },

    isBtnActive() {
      return !!this.pizzaName.length && !this.isFillingEmpty;
    },
  },
  methods: {
    changeName(name) {
      this.$store.dispatch("Builder/setPizzaName", name);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
@import "@/assets/scss/fonts";
@import "@/assets/scss/scaffolding";
@import "@/assets/scss/visually-hidden";
</style>
