<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          :class="`diameter__input diameter__input--${size.value}`"
          v-for="(size, i) in sizes"
          :key="i"
        >
          <RadioButton
            :name="`diameter`"
            :value="size.value"
            :isChecked="size.isChecked"
          ></RadioButton>
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/components/RadioButton";
export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
