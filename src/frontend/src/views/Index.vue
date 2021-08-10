<template>
  <div>
    <AppLayout></AppLayout>

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
            @valueChanged="changePizzaFilling($event)"
          ></BuilderIngredientsSelector>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <BuilderPizzaView :pizzaCssClass="pizzaCssClass"></BuilderPizzaView>

            <BuilderPriceCounter :price="price"></BuilderPriceCounter>
          </div>
        </div>
      </form>
    </main>
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
  doughClassMapping,
  defaultPizzaCssClass,
} from "@/common/helpers.js";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "Index",
  components: {
    AppLayout,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPriceCounter,
  },
  data() {
    return {
      misc,
      pizza,
      user,
      price: 0,
      pizzaCssClass: defaultPizzaCssClass,
    };
  },
  created() {
    this.calculatePrice(this.chosenOptions);
  },
  methods: {
    changePizzaOption(option, newValue) {
      this.chosenOptions[option] = newValue;
      this.calculatePrice(this.chosenOptions);
      if (option === "sauce" || option === "dough") {
        this.pizzaCssClass = `pizza--foundation--${
          doughClassMapping[this.chosenOptions.dough]
        }-${this.chosenOptions.sauce}`;
      }
    },
    changePizzaFilling(ingredient) {
      console.log(ingredient);
      if (this.chosenOptions["filling"] === undefined) {
        this.$set(this.chosenOptions, "filling", {});
      }
      this.chosenOptions["filling"][ingredient.name] = ingredient.value;
      this.calculatePrice(this.chosenOptions);
    },
    calculateFilling() {
      let fillingTotal = 0;
      if (this.chosenOptions["filling"] === undefined) {
        return 0;
      }
      Object.keys(this.chosenOptions["filling"]).forEach((fillingItem) => {
        const fillingItemPrice = this.ingredients.find(
          (ingredient) => ingredient.value === fillingItem
        ).price;
        const fillingItemQuantity = this.chosenOptions["filling"][fillingItem];
        fillingTotal += fillingItemPrice * fillingItemQuantity;
      });
      console.log(fillingTotal);
      return fillingTotal;
    },
    calculatePrice(chosenOptions) {
      let doughPrice = this.doughs
        ? this.doughs.find((dough) => dough.value === chosenOptions.dough).price
        : 0;
      let saucePrice = this.sauces
        ? this.sauces.find((sauce) => sauce.value === chosenOptions.sauce).price
        : 0;
      let multiplier = this.sizes
        ? this.sizes.find((size) => size.value === chosenOptions.size)
            .multiplier
        : 1;
      let fillingPrice = this.calculateFilling();
      this.price = multiplier * (doughPrice + saucePrice + fillingPrice);
    },
  },
  computed: {
    doughs() {
      return this.pizza.dough.map((doughItem, index) => {
        return {
          name: doughItem.name,
          image: doughItem.image,
          description: doughItem.description,
          price: doughItem.price,
          value: doughMap.find((item) => item.name === doughItem.name).value,
          isChecked: index === 0,
        };
      });
    },
    sizes() {
      return this.pizza.sizes.map((sizeItem, index) => {
        return {
          name: sizeItem.name,
          image: sizeItem.image,
          multiplier: sizeItem.multiplier,
          value: sizeMap.find((item) => item.multiplier === sizeItem.multiplier)
            .value,
          isChecked: index === 1,
        };
      });
    },
    sauces() {
      return this.pizza.sauces.map((sauceItem, index) => {
        return {
          name: sauceItem.name,
          price: sauceItem.price,
          value: sauceMap.find((item) => item.name === sauceItem.name).value,
          isChecked: index === 0,
        };
      });
    },
    ingredients() {
      return this.pizza.ingredients.map((ingredientItem) => {
        return {
          name: ingredientItem.name,
          price: ingredientItem.price,
          value: ingredientMap.find((item) => item.name === ingredientItem.name)
            .value,
        };
      });
    },
    chosenOptions() {
      return {
        dough: this.doughs.find((dough) => dough.isChecked).value,
        sauce: this.sauces.find((sauce) => sauce.isChecked).value,
        size: this.sizes.find((size) => size.isChecked).value,
      };
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
