<template>
  <div :class="`counter counter--orange ${name}__counter`">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="minusOne"
      data-test="button--minus"
      :disabled="value === minValue"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="plusOne"
      data-test="button--plus"
      :disabled="value === maxValue"
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
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
  },
  methods: {
    plusOne() {
      this.$emit("plusOne");
    },
    minusOne() {
      this.$emit("minusOne");
    },
  },
};
</script>

<style scoped></style>
