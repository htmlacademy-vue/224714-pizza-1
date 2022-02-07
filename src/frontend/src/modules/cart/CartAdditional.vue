<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartMiscListItem
        v-for="(miscItem, i) in misc"
        :key="i"
        :miscItem="miscItem"
        data-test="misc-item"
      />
    </ul>
  </div>
</template>

<script>
import CartMiscListItem from "@/modules/cart/CartMiscListItem";
export default {
  name: "CartAdditional",
  components: { CartMiscListItem },
  computed: {
    misc() {
      return this.$store.state.misc;
    },
  },
};
</script>

<style scoped></style>
