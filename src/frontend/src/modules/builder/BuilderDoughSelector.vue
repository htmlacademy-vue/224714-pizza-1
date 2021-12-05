<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          :class="`dough__input dough__input--${dough.value}`"
          v-for="(dough, i) in doughs"
          :key="i"
        >
          <RadioButton
            :name="`dough`"
            :value="dough.value"
            :isChecked="dough.value === currentDough"
            @valueChanged="$store.dispatch(`Builder/setDough`, $event)"
          ></RadioButton>
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/components/RadioButton";
import { mapGetters } from "vuex";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  created() {
    if (this.doughs && this.doughs.length) {
      if (!this.currentDough) {
        const currentDough = this.doughs.find((dough) => dough.isChecked).value;
        this.$store.dispatch("Builder/setDough", currentDough);
      }
    }
  },
  computed: {
    ...mapGetters("Builder", ["doughs"]),
    currentDough() {
      return this.$store.state.Builder.dough;
    },
  },
  watch: {
    doughs: function (val) {
      if (!this.currentDough) {
        const currentDough = val.find((dough) => dough.isChecked).value;
        this.$store.dispatch("Builder/setDough", currentDough);
      }
    },
  },
};
</script>

<style scoped></style>
