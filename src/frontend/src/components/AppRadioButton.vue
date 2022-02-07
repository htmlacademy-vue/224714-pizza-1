<template>
  <input
    :name="name"
    :value="value"
    :checked="isChecked"
    type="radio"
    class="visually-hidden"
    @change="$emit('valueChanged', value)"
  />
</template>

<script>
export default {
  name: "AppRadioButton",
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
    },
  },
};
</script>

<style lang="scss" scoped></style>
