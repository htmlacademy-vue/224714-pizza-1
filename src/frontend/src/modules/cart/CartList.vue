<template>
  <div>
    <ul class="cart-list sheet">
      <CartListItem
        v-for="(pizza, index) in pizzas"
        :key="index"
        :pizza="pizza"
        data-test="cart-list-item"
      ></CartListItem>
    </ul>
  </div>
</template>

<script>
import CartListItem from "@/modules/cart/CartListItem";
export default {
  name: "CartList",
  components: { CartListItem },
  computed: {
    pizzas() {
      return this.$store.state.Cart.pizzas;
    },
  },
};
</script>

<style scoped></style>
