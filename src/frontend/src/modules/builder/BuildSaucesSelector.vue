<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      class="radio ingredients__input"
      v-for="(sauce, i) in sauces"
      :key="i"
    >
      <RadioButton
        :name="`sauce`"
        :value="sauce.value"
        :isChecked="sauce.isChecked"
        @valueChanged="$emit('changeSauce', $event)"
      ></RadioButton>
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
import RadioButton from "@/components/RadioButton";
export default {
  name: "BuildSaucesSelector",
  components: { RadioButton },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
