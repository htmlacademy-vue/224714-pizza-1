<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <OrderListItem
      v-for="order in ordersFormatted"
      :key="order.id"
      :order="order"
      data-test="order-list-item"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import OrderListItem from "@/modules/orders/OrderListItem";
import { auth } from "@/middlewares";

export default {
  name: "Orders",
  layout: "AppLayoutProfile",
  components: { OrderListItem },
  middlewares: [auth],
  computed: {
    ...mapState("Orders", ["orders"]),

    ...mapGetters("Orders", ["ordersFormatted"]),
  },
  beforeCreate() {
    this.$store.dispatch("Orders/query");
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/blocks/input.scss";
</style>
