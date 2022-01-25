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
          <li>{{ sizeRussian }}, {{ doughText }}</li>
          <li>Соус: {{ sauceRussian }}</li>
          <li>Начинка: {{ fillingRussian }}</li>
        </ul>
      </div>
    </div>

    <ItemCounter
      :name="`cart-list`"
      :value="pizza.quantity"
      :min-value="0"
      :max-value="Infinity"
      @plusOne="plusOnePizza()"
      @minusOne="minusOnePizza()"
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
  sauceMap,
  doughCartTextMap,
  sizeTextMap,
  capitalizeFirstLetter,
  getValueById,
  sizeMap,
  doughMap,
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
    plusOnePizza() {
      this.$store.dispatch(`Cart/plusOnePizza`, this.pizza.id);
    },
    minusOnePizza() {
      this.$store.dispatch(`Cart/minusOnePizza`, this.pizza.id);
    },
  },
  computed: {
    pizzaNameCapitalized() {
      return capitalizeFirstLetter(this.pizza.name);
    },
    sauceRussian() {
      return sauceMap
        .find((sauce) => sauce.id === this.pizza.sauce)
        .name.toLowerCase();
    },
    sizeRussian() {
      return sizeTextMap[getValueById(sizeMap, this.pizza.size)];
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
      return doughCartTextMap[getValueById(doughMap, this.pizza.dough)];
    },
    pizzaSubSum() {
      return this.pizza.price * this.pizza.quantity;
    },
  },
};
</script>

<style scoped></style>
