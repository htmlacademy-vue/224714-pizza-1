<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: TODO 1 564 ₽</span>
      </div>

      <div class="order__button">
        <button type="button" class="button button--border">Удалить</button>
      </div>
      <div class="order__button">
        <button type="button" class="button">Повторить</button>
      </div>
    </div>

    <ul class="order__list">
      <li class="order__item" v-for="(pizza, i) in order.orderPizzas" :key="i">
        <div class="product">
          <img
            src="@/assets/img/product.svg"
            class="product__img"
            width="56"
            height="56"
            :alt="pizza.name"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>
                {{ getSizeText(pizza.sizeId) }},
                {{ getDoughText(pizza.doughId) }}
              </li>
              <li>Соус: {{ getSauceById(pizza.sauceId) }}</li>
              <li>Начинка: {{ getFillingRussian(pizza.ingredients) }}</li>
            </ul>
          </div>
        </div>

        <p class="order__price">Todo 2х782 ₽</p>
      </li>
    </ul>

    <ul class="order__additional">
      <li>
        <img
          src="@/assets/img/cola.svg"
          width="20"
          height="30"
          alt="Coca-Cola 0,5 литра"
        />
        <p>
          <span>Todo Coca-Cola 0,5 литра</span>
          <b>56 ₽</b>
        </p>
      </li>
      <li>
        <img
          src="@/assets/img/sauce.svg"
          width="20"
          height="30"
          alt="Острый соус"
        />
        <span>Острый соус <br />30 ₽</span>
      </li>
      <li>
        <img
          src="@/assets/img/potato.svg"
          width="20"
          height="30"
          alt="Картошка из печи"
        />
        <p>
          <span>Картошка из печи</span>
          <b>170 ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: {{ address }}</p>
  </section>
</template>

<script>
import {
  doughCartTextMap,
  doughMap,
  getNameById,
  getValueById,
  ingredientMap,
  sizeTextMap,
  sizeMap,
  sauceMap,
} from "@/common/helpers";

export default {
  name: "OrderListItem",
  props: {
    order: {
      required: true,
      type: Object,
    },
  },
  created() {},
  methods: {
    getFillingRussian(ingredients) {
      console.log(ingredients);
      return ingredients
        .map((ingredient) => {
          return getNameById(ingredientMap, ingredient.ingredientId);
        })
        .join(`, `);
    },
    getDoughText(doughId) {
      return doughCartTextMap[getValueById(doughMap, doughId)];
    },
    getSizeText(sizeId) {
      return sizeTextMap[getValueById(sizeMap, sizeId)];
    },
    getSauceById(sauceId) {
      return getNameById(sauceMap, sauceId);
    },
  },
  computed: {
    address() {
      return this.order.orderAddress?.name ?? "самовывоз";
    },
  },
};
</script>

<style scoped></style>
