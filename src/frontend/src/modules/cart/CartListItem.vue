<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizzaNameCapitalized"
      />
      <div class="product__text">
        <h2>{{ pizzaNameCapitalized }}</h2>
        <ul>
          <li>{{ sizeRussian }}, {{ doughText }}</li>
          <li>Соус: {{ sauceRussian }}</li>
          <li>Начинка: {{ fillingRussian }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button type="button" class="counter__button counter__button--minus">
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" value="1" />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ pizza.price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
    </div>
  </li>
</template>

<script>
import {
  ingredientMap,
  sauceMap,
  doughCartTextMap,
  sizeTextMap,
  capitalizeFirstLetter,
} from "@/common/helpers";

export default {
  name: "CartListItem",
  props: {
    pizza: {
      required: true,
      type: Object,
    },
  },
  computed: {
    pizzaNameCapitalized() {
      return capitalizeFirstLetter(this.pizza.name);
    },
    sauceRussian() {
      return sauceMap
        .find((sauce) => sauce.value === this.pizza.sauce)
        .name.toLowerCase();
    },
    sizeRussian() {
      return sizeTextMap[this.pizza.size];
    },
    fillingRussian() {
      return Object.keys(this.pizza.filling)
        .map((fillingItem) => {
          return ingredientMap
            .find((item) => item.value === fillingItem)
            .name.toLowerCase();
        })
        .join(`, `);
    },
    doughText() {
      return doughCartTextMap[this.pizza.dough];
    },
  },
};
</script>

<style scoped></style>
