<template>
  <div :class="`counter counter--orange ${name}__counter`">
    <button
      :disabled="value === minValue"
      type="button"
      class="counter__button counter__button--minus"
      data-test="button--minus"
      @click="minusOne"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      :disabled="value === maxValue"
      type="button"
      class="counter__button counter__button--plus"
      data-test="button--plus"
      @click="plusOne"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AppCounter",
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
