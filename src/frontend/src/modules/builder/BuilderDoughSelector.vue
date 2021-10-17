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
  computed: {
    ...mapGetters("Builder", ["doughs"]),
    currentDough() {
      if (!this.$store.state.Builder.dough) {
        const currentDough = this.doughs.find((dough) => dough.isChecked).value;
        this.$store.dispatch("Builder/setDough", currentDough);
      }
      return this.$store.state.Builder.dough;
    },
  },
};
</script>

<style scoped></style>
