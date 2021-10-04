<template>
  <input
    type="radio"
    :name="name"
    :value="value"
    class="visually-hidden"
    :checked="isChecked"
    @change="$store.dispatch(`Builder/set${capitalizedName}`, value)"
  />
</template>

<script>
import { capitalizeFirstLetter } from "@/common/helpers";
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    capitalizedName() {
      return capitalizeFirstLetter(this.name);
    },
  },
};
</script>

<style scoped></style>
