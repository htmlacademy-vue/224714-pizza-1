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
            :isChecked="size.value === currentSize"
          ></RadioButton>
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/components/RadioButton";
import { mapGetters } from "vuex";
export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  computed: {
    ...mapGetters("Builder", ["sizes"]),
    currentSize() {
      if (!this.$store.state.Builder.size) {
        const currentSize = this.sizes.find((size) => size.isChecked).value;
        this.$store.dispatch("Builder/setDiameter", currentSize);
      }
      return this.$store.state.Builder.size;
    },
  },
};
</script>

<style scoped></style>
