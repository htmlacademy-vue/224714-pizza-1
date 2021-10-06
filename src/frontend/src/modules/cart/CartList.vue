<template>
  <div>
    <ul class="cart-list sheet">
      <CartListItem></CartListItem>
    </ul>
  </div>
</template>

<script>
import CartListItem from "@/modules/cart/CartListItem";
export default {
  name: "CartList",
  components: { CartListItem },
};
</script>

<style scoped></style>
