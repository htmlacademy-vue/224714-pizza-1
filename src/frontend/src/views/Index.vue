<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

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
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button button--disabled" disabled>
                Готовьте!
              </button>
            </div>
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
} from "@/common/helpers.js";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";

export default {
  name: "Index",
  components: {
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
  data() {
    return {
      misc,
      pizza,
      user,
    };
  },
  created() {},
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
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
@import "@/assets/scss/fonts";
@import "@/assets/scss/scaffolding";
@import "@/assets/scss/visually-hidden";
</style>
