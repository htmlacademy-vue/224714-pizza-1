<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector :doughs="doughs"></BuilderDoughSelector>
          <BuilderSizeSelector :sizes="sizes"></BuilderSizeSelector>
          <BuilderIngredientsSelector
            :sauces="sauces"
            :ingredients="ingredients"
          ></BuilderIngredientsSelector>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
                v-model="$store.state.Builder.pizzaName"
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
    <router-view name="modal"></router-view>
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import user from "@/static/user.json";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Index",
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPriceCounter,
  },
  data() {
    return {
      misc,
      user,
    };
  },
  created() {
    this.$store.dispatch("init");
  },
  methods: {
    changePizzaOption(option, newValue) {
      const context = `Builder/set${option}`;
      this.$store.dispatch(context, newValue);
    },
  },
  computed: {
    ...mapState(["pizza"]),
    ...mapState("Builder", ["filling", "pizzaName"]),
    ...mapGetters("Builder", ["doughs", "sauces", "sizes", "ingredients"]),
    dough() {
      if (!this.$store.state.Builder.dough) {
        const currentDough = this.doughs.find((dough) => dough.isChecked).value;
        this.$store.dispatch("Builder/setDough", currentDough);
      }
      return this.$store.state.Builder.dough;
    },
    sauce() {
      if (!this.$store.state.Builder.sauce) {
        const currentSauce = this.sauces.find((sauce) => sauce.isChecked).value;
        this.$store.dispatch("Builder/setSauce", currentSauce);
      }
      return this.$store.state.Builder.sauce;
    },
    size() {
      if (!this.$store.state.Builder.size) {
        const currentSize = this.sizes.find((size) => size.isChecked).value;
        this.$store.dispatch("Builder/setDiameter", currentSize);
      }
      return this.$store.state.Builder.size;
    },
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
