<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizzaNameCapitalized"
        data-test="pizza-image"
      />
      <div class="product__text">
        <h2 data-test="title">{{ pizzaNameCapitalized }}</h2>
        <ul>
          <li data-test="size-and-dough">{{ sizeRussian }}, {{ doughText }}</li>
          <li data-test="sauce">Соус: {{ sauceRussian }}</li>
          <li data-test="filling">Начинка: {{ fillingRussian }}</li>
        </ul>
      </div>
    </div>

    <AppCounter
      :name="`cart-list`"
      :value="pizza.quantity"
      :min-value="0"
      :max-value="Infinity"
      data-test="counter"
      @plusOne="plusOnePizza()"
      @minusOne="minusOnePizza()"
    />

    <div class="cart-list__price">
      <b data-test="sum">{{ pizzaSubSum }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        data-test="change-btn"
        @click="changePizza"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import {
  doughCartTextMap,
  capitalizeFirstLetter,
  getNameById,
} from "@/common/helpers";
import AppCounter from "@/components/AppCounter";

export default {
  name: "CartListItem",
  components: { AppCounter },
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
      return getNameById(
        this.$store.state.pizza.sauces,
        this.pizza.sauce
      ).toLowerCase();
    },

    sizeRussian() {
      return getNameById(this.$store.state.pizza.sizes, this.pizza.size);
    },

    fillingRussian() {
      return Object.keys(this.pizza.filling)
        .map((fillingItem) => {
          return this.$store.state.pizza.ingredients
            .find((item) => +item.id === +fillingItem)
            .name.toLowerCase();
        })
        .join(`, `);
    },

    doughText() {
      return doughCartTextMap[
        getNameById(this.$store.state.pizza.dough, this.pizza.dough)
      ];
    },

    pizzaSubSum() {
      return this.pizza.price * this.pizza.quantity;
    },
  },

  methods: {
    changePizza() {
      this.$store.dispatch("Builder/loadPizza", this.pizza);
      this.$router.push(`/`);
    },

    plusOnePizza() {
      this.$store.dispatch(`Cart/plusOnePizza`, this.pizza.id);
    },

    minusOnePizza() {
      this.$store.dispatch(`Cart/minusOnePizza`, this.pizza.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/blocks/button.scss";
@import "@/assets/scss/blocks/cart-list.scss";
@import "@/assets/scss/blocks/product.scss";
</style>
