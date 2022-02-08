<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b data-test="number">Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span data-test="sum">Сумма заказа: {{ order.total }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          data-test="remove-btn"
          @click="removeOrder"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button"
          data-test="repeat-btn"
          @click="repeatOrder"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        class="order__item"
      >
        <div class="product">
          <img
            src="@/assets/img/product.svg"
            class="product__img"
            width="56"
            height="56"
            :alt="pizza.name"
            data-test="image"
          />
          <div class="product__text">
            <h2 data-test="pizza-name">{{ pizza.name }}</h2>
            <ul>
              <li data-test="size-and-dough">
                {{ pizza.size }},
                {{ pizza.dough }}
              </li>
              <li data-test="sauce">Соус: {{ pizza.sauce }}</li>
              <li data-test="ingredients">Начинка: {{ pizza.ingredients }}</li>
            </ul>
          </div>
        </div>

        <p
          class="order__price"
          data-test="price">
          {{ pizza.quantity }}x{{ pizza.price }} ₽
        </p>
      </li>
    </ul>

    <ul class="order__additional">
      <li
        v-for="misc in order.orderMisc"
        :key="misc.id"
        data-test="misc-list-item"
      >
        <img
          :src="misc.image"
          width="20"
          height="30"
          :alt="misc.name"
          data-test="misc-image"
        />
        <p>
          <span data-test="misc-name">{{ misc.name }}</span>
          <b data-test="misc-price">{{ misc.price }} ₽</b>
        </p>
      </li>
    </ul>

    <p
      class="order__address"
      data-test="address">
      Адрес доставки: {{ address }}
    </p>
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

  computed: {
    address() {
      return this.order.orderAddress?.name ?? "самовывоз";
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
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/blocks/button.scss";
@import "@/assets/scss/blocks/product.scss";
@import "@/assets/scss/blocks/order.scss";
</style>
