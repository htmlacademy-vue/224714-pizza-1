<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ order.total }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="removeOrder"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="repeatOrder">
          Повторить
        </button>
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
                {{ pizza.size }},
                {{ pizza.dough }}
              </li>
              <li>Соус: {{ pizza.sauce }}</li>
              <li>Начинка: {{ pizza.ingredients }}</li>
            </ul>
          </div>
        </div>

        <p class="order__price">{{ pizza.quantity }}x{{ pizza.price }} ₽</p>
      </li>
    </ul>

    <ul class="order__additional">
      <li v-for="(misc, i) in order.orderMisc" :key="i">
        <img :src="misc.image" width="20" height="30" :alt="misc.name" />
        <p>
          <span>{{ misc.name }}</span>
          <b>{{ misc.price }} ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: {{ address }}</p>
  </section>
</template>

<script>
import { DEFAULT_ADDRESS_OPTION } from "@/common/const";
import { getAddressIndex } from "@/common/helpers";

export default {
  name: "OrderListItem",
  props: {
    order: {
      required: true,
      type: Object,
    },
  },
  methods: {
    async removeOrder() {
      await this.$store.dispatch("Orders/delete", this.order.id);
    },
    repeatOrder() {
      const orderOriginal = this.$store.state.Orders.orders.find(
        (order) => order.id === this.order.id
      );
      const makeFillingObject = (filling) => {
        let fillingObject = {};
        filling.forEach((fillingItem) => {
          fillingObject[fillingItem.ingredientId] = fillingItem.quantity;
        });
        return fillingObject;
      };
      const pizzasFormatted = orderOriginal.orderPizzas.map((pizza, i) => {
        return {
          name: pizza.name,
          sauce: pizza.sauceId,
          dough: pizza.doughId,
          size: pizza.sizeId,
          price: this.order.orderPizzas[i].price,
          quantity: this.order.orderPizzas[i].quantity,
          filling: makeFillingObject(pizza.ingredients),
          id: new Date().getTime(),
        };
      });
      const getMiscFormatted = () => {
        let miscFormatted = {};
        if (orderOriginal.orderMisc) {
          orderOriginal.orderMisc.forEach((misc) => {
            miscFormatted[misc.miscId] = misc.quantity;
          });
        }
        return miscFormatted;
      };

      const getAddressOption = (addressId) => {
        let addressOptionIndex = DEFAULT_ADDRESS_OPTION;
        this.$store.state.Addresses.addresses.find((address, index) => {
          if (+addressId === +address.id) {
            addressOptionIndex = getAddressIndex(index);
          }
        });
        return addressOptionIndex;
      };

      this.$store.dispatch("Cart/addPizzas", {
        pizzas: pizzasFormatted,
        miscs: getMiscFormatted(),
        addressOption: this.order.orderAddress?.id
          ? getAddressOption(this.order.orderAddress.id)
          : DEFAULT_ADDRESS_OPTION,
        address: this.order.orderAddress ?? null,
      });
      this.$router.push({ name: `Cart` });
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
