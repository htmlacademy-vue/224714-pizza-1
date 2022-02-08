<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartMiscListItem
        v-for="(miscItem, i) in misc"
        :key="i"
        :misc-item="miscItem"
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

<style lang="scss" scoped>
@import "@/assets/scss/blocks/cart.scss";
@import "@/assets/scss/blocks/additional-list.scss";
</style>
