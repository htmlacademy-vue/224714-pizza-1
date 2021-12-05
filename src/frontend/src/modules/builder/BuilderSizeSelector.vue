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
            @valueChanged="$store.dispatch(`Builder/setDiameter`, $event)"
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
  created() {
    if (this.sizes && this.sizes.length) {
      if (!this.currentSize) {
        const currentSize = this.sizes.find((size) => size.isChecked).value;
        this.$store.dispatch("Builder/setDiameter", currentSize);
      }
    }
  },
  computed: {
    ...mapGetters("Builder", ["sizes"]),
    currentSize() {
      return this.$store.state.Builder.size;
    },
  },
  watch: {
    sizes: function (val) {
      if (!this.currentSize) {
        const currentSize = val.find((size) => size.isChecked).value;
        this.$store.dispatch("Builder/setDiameter", currentSize);
      }
    },
  },
};
</script>

<style scoped></style>
