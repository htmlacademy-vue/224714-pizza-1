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
        :min-value="0"
        :max-value="Infinity"
        @plusOne="plusOneMiscItem()"
        @minusOne="minusOneMiscItem()"
      ></ItemCounter>
      <div class="additional-list__price">
        <b>{{ subTotal }} ₽</b>
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
    plusOneMiscItem() {
      this.$store.dispatch("Cart/plusOneMiscItem", this.miscItem.id);
    },
    minusOneMiscItem() {
      this.$store.dispatch("Cart/minusOneMiscItem", this.miscItem.id);
    },
  },
  computed: {
    value() {
      return this.$store.state.Cart.misc[this.miscItem.id] || 0;
    },
    subTotal() {
      return this.miscItem.price * this.value;
    },
  },
};
</script>

<style scoped></style>
