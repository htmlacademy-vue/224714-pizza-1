<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector
            :doughs="doughs"
            @changeDough="changePizzaOption('dough', $event)"
          ></BuilderDoughSelector>
          <BuilderSizeSelector
            :sizes="sizes"
            @changeSize="changePizzaOption('size', $event)"
          ></BuilderSizeSelector>
          <BuilderIngredientsSelector
            :sauces="sauces"
            :ingredients="ingredients"
            @changeSauce="changePizzaOption('sauce', $event)"
            @changeFilling="changePizzaFilling($event)"
          ></BuilderIngredientsSelector>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
                v-model="pizzaName"
              />
            </label>

            <BuilderPizzaView
              :dough="dough"
              :sauce="sauce"
              :filling="filling"
            ></BuilderPizzaView>

            <BuilderPriceCounter
              :price="price"
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
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import {
  doughMap,
  sizeMap,
  sauceMap,
  ingredientMap,
} from "@/common/helpers.js";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";
import EventBus from "@/common/event-bus";

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
    const doughs = pizza.dough.map((doughItem, index) => {
      return {
        name: doughItem.name,
        image: doughItem.image,
        description: doughItem.description,
        price: doughItem.price,
        value: doughMap.find((item) => item.name === doughItem.name).value,
        isChecked: index === 0,
      };
    });
    const sizes = pizza.sizes.map((sizeItem, index) => {
      return {
        name: sizeItem.name,
        image: sizeItem.image,
        multiplier: sizeItem.multiplier,
        value: sizeMap.find((item) => item.multiplier === sizeItem.multiplier)
          .value,
        isChecked: index === 1,
      };
    });
    const sauces = pizza.sauces.map((sauceItem, index) => {
      return {
        name: sauceItem.name,
        price: sauceItem.price,
        value: sauceMap.find((item) => item.name === sauceItem.name).value,
        isChecked: index === 0,
      };
    });
    const ingredients = pizza.ingredients.map((ingredientItem) => {
      return {
        name: ingredientItem.name,
        price: ingredientItem.price,
        value: ingredientMap.find((item) => item.name === ingredientItem.name)
          .value,
      };
    });
    return {
      misc,
      user,
      sauces,
      doughs,
      sizes,
      ingredients,
      dough: doughs.find((dough) => dough.isChecked).value,
      sauce: sauces.find((sauce) => sauce.isChecked).value,
      size: sizes.find((size) => size.isChecked).value,
      filling: {},
      pizzaName: ``,
    };
  },
  watch: {
    price: {
      immediate: true,
      handler(newVal) {
        this.$store.dispatch("Builder/setPrice", newVal);
      },
    },
  },
  created() {},
  mounted() {
    EventBus.$on("ingredientDropped", (ingredient) => {
      let newValue;
      if (this.filling[ingredient]) {
        newValue = this.filling[ingredient] + 1;
      } else {
        newValue = 1;
      }
      this.changePizzaFilling({ name: ingredient, value: newValue });
    });
  },
  methods: {
    changePizzaOption(option, newValue) {
      this[option] = newValue;
    },
    changePizzaFilling(ingredient) {
      this.$set(this.filling, ingredient.name, ingredient.value);
    },
    calculateFilling() {
      let fillingTotal = 0;
      if (this.filling === undefined) {
        return 0;
      }
      Object.keys(this.filling).forEach((fillingItem) => {
        const fillingItemPrice = this.ingredients.find(
          (ingredient) => ingredient.value === fillingItem
        ).price;
        const fillingItemQuantity = this.filling[fillingItem];
        fillingTotal += fillingItemPrice * fillingItemQuantity;
      });
      return fillingTotal;
    },
  },
  computed: {
    price() {
      let doughPrice = this.doughs
        ? this.doughs.find((dough) => dough.value === this.dough).price
        : 0;
      let saucePrice = this.sauces
        ? this.sauces.find((sauce) => sauce.value === this.sauce).price
        : 0;
      let multiplier = this.sizes
        ? this.sizes.find((size) => size.value === this.size).multiplier
        : 1;
      let fillingPrice = this.calculateFilling();
      return multiplier * (doughPrice + saucePrice + fillingPrice);
    },
    isBtnActive() {
      return !!this.pizzaName.length && !!this.calculateFilling();
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
