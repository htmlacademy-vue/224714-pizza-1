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

    <ItemCounter
      :name="`cart-list`"
      :value="pizza.quantity"
      :item="pizza.id"
      :min-value="0"
      :max-value="Infinity"
      @plusOne="plusOnePizza($event)"
      @minusOne="minusOnePizza($event)"
    ></ItemCounter>

    <div class="cart-list__price">
      <b>{{ pizzaSubSum }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="changePizza">
        Изменить
      </button>
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
import ItemCounter from "@/components/ItemCounter";

export default {
  name: "CartListItem",
  components: { ItemCounter },
  props: {
    pizza: {
      required: true,
      type: Object,
    },
  },
  methods: {
    changePizza() {
      this.$store.dispatch("Builder/loadPizza", this.pizza);
      this.$router.push({ name: `Index` });
    },
    plusOnePizza(pizzaId) {
      if (this.pizza.id === pizzaId) {
        this.$store.dispatch(`Cart/plusOnePizza`, pizzaId);
      }
    },
    minusOnePizza(pizzaId) {
      if (this.pizza.id === pizzaId) {
        this.$store.dispatch(`Cart/minusOnePizza`, pizzaId);
      }
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
    pizzaSubSum() {
      return this.pizza.price * this.pizza.quantity;
    },
  },
};
</script>

<style scoped></style>
