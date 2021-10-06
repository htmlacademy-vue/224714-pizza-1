<template>
  <div>
    <ul class="cart-list sheet">
      <CartListItem
        v-for="(pizza, index) in pizzas"
        :key="index"
        :pizza="pizza"
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
      console.log(this.$store.state.Cart.cart);
      return this.$store.state.Cart.cart;
    },
  },
};
</script>

<style scoped></style>
