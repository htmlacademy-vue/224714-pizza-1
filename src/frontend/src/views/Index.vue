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
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
                v-model="$store.state.Builder.pizzaName"
                data-test="pizza-name"
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
    <transition name="fade" mode="in-out">
      <router-view name="modal"></router-view>
    </transition>
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
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPriceCounter,
  },
  computed: {
    ...mapState("Builder", ["filling", "pizzaName"]),
    isBtnActive() {
      const isFillingEmpty =
        Object.keys(this.$store.state.Builder.filling).length === 0;
      return !!this.pizzaName.length && !isFillingEmpty;
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
