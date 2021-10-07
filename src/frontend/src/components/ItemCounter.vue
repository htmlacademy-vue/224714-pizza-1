<template>
  <div :class="`counter counter--orange ${name}__counter`">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="minusOne"
      :disabled="value === 0"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="value === 3"
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
    ingredient: {
      type: String,
      required: true,
    },
  },
  methods: {
    plusOne() {
      this.$emit("plusOne", this.ingredient);
    },
    minusOne() {
      this.$emit("minusOne", this.ingredient);
    },
  },
};
</script>

<style scoped></style>
