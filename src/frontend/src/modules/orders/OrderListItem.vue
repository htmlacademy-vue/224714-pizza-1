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
      console.log(orderOriginal);
      const pizza = {
        dough: this.order.dough,
        sauce: this.order.sauce,
        size: this.order.size,
        name: this.order.name,
        filling: this.order.filling,
      };
      console.log(pizza);
      this.$store.dispatch("Builder/loadPizza", pizza);
      this.$store.dispatch(
        "Cart/addPizza",
        this.$store.getters["Builder/pizza"]
      );
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
