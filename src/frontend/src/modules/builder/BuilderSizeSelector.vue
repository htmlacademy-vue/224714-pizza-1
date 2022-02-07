<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="(size, i) in sizes"
          :key="i"
          :class="`diameter__input diameter__input--${size.value}`"
          data-test="label"
        >
          <AppRadioButton
            :name="`diameter`"
            :value="size.id"
            :is-checked="size.id === currentSize"
            data-test="radio"
            @valueChanged="$store.dispatch(`Builder/setDiameter`, $event)"
          />
          <span data-test="name">{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import AppRadioButton from "@/components/AppRadioButton";
import { mapGetters } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: { AppRadioButton },
  computed: {
    ...mapGetters("Builder", ["sizes"]),
    currentSize() {
      return this.$store.state.Builder.size;
    },
  },

  created() {
    if (this.sizes && this.sizes.length) {
      if (!this.currentSize) {
        const currentSize = this.sizes.find((size) => size.isChecked).id;
        this.$store.dispatch("Builder/setDiameter", currentSize);
      }
    }
  },
};
</script>

<style scoped></style>
