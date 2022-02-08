<template>
  <div>
    <ul class="cart-list sheet">
      <CartListItem
        v-for="pizza in pizzas"
        :key="pizza.id"
        :pizza="pizza"
        data-test="cart-list-item"
      />
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

<style lang="scss" scoped>
@import "@/assets/scss/blocks/cart-list.scss";
</style>

