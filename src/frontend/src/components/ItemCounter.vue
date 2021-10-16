<template>
  <div :class="`counter counter--orange ${name}__counter`">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="minusOne"
      :disabled="value === minValue"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="value === maxValue"
      @click="plusOne"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    item: {
      // type: String,
      required: true,
    },
    minValue: {
      type: Number,
    },
    maxValue: {
      type: Number,
    },
  },
  methods: {
    plusOne() {
      this.$emit("plusOne", this.item);
    },
    minusOne() {
      this.$emit("minusOne", this.item);
    },
  },
};
</script>

<style scoped></style>
