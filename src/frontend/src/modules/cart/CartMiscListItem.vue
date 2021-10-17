<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="miscItem.image" width="39" height="60" :alt="miscItem.name" />
      <span>{{ miscItem.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <ItemCounter
        :name="`additional-list`"
        :value="value"
        :item="miscItem.id"
        :min-value="0"
        :max-value="Infinity"
        @plusOne="plusOneMiscItem($event)"
        @minusOne="minusOneMiscItem($event)"
      ></ItemCounter>
      <div class="additional-list__price">
        <b>{{ miscItem.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import ItemCounter from "@/components/ItemCounter";
export default {
  name: "CartMiscListItem",
  components: { ItemCounter },
  props: {
    miscItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    plusOneMiscItem(miscId) {
      if (this.miscItem.id === miscId) {
        this.$store.dispatch("Cart/plusOneMiscItem", miscId);
      }
    },
    minusOneMiscItem(miscId) {
      if (this.miscItem.id === miscId) {
        this.$store.dispatch("Cart/minusOneMiscItem", miscId);
      }
    },
  },
  computed: {
    value() {
      return this.$store.state.Cart.misc[this.miscItem.id] || 0;
    },
  },
};
</script>

<style scoped></style>
