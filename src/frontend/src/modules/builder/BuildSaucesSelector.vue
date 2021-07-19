<template>
  <div class="ingridients__sauce">
    <p>Основной соус:</p>

    <label
      class="radio ingridients__input"
      v-for="(sauce, i) in sauces"
      :key="i"
    >
      <RadioButton
        :name="`sauce`"
        :value="sauce.value"
        :isChecked="sauce.isChecked"
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
