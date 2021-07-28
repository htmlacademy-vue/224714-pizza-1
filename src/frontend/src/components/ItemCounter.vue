<template>
  <div :class="`counter counter--orange ${name}__counter`">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      @change="$emit('valueChanged', { value: value, name: name })"
      ref="counter"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="$refs.counter.value += 1"
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
      default: 0,
    },
  },
};
</script>

<style scoped></style>
