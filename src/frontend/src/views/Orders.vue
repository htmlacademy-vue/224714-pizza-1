<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    {{ ordersFormatted }}
    <OrderListItem
      v-for="(order, i) in ordersFormatted"
      :key="i"
      :order="order"
    ></OrderListItem>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import OrderListItem from "@/modules/orders/OrderListItem";

export default {
  name: "Orders",
  components: { OrderListItem },
  beforeCreate() {
    this.$store.dispatch("Orders/query");
  },
  methods: {},
  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapGetters("Orders", ["ordersFormatted"]),
  },
};
</script>
