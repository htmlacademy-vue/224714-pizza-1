<template>
  <input
    type="radio"
    :name="name"
    :value="value"
    class="visually-hidden"
    :checked="isChecked"
    @change="$emit('valueChanged', value)"
  />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style scoped></style>
