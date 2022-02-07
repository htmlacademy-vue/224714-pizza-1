<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="(dough, i) in doughs"
          :key="i"
          :class="`dough__input dough__input--${dough.value}`"
          data-test="label"
        >
          <AppRadioButton
            :name="`dough`"
            :value="dough.id"
            :isChecked="dough.id === currentDough"
            @valueChanged="$store.dispatch(`Builder/setDough`, $event)"
            data-test="radio"
          />
          <b data-test="name">{{ dough.name }}</b>
          <span data-test="description">{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import AppRadioButton from "@/components/AppRadioButton";
import { mapGetters } from "vuex";

export default {
  name: "BuilderDoughSelector",
  components: { AppRadioButton },
  computed: {
    ...mapGetters("Builder", ["doughs"]),

    currentDough() {
      return this.$store.state.Builder.dough;
    },
  },
  created() {
    if (this.doughs && this.doughs.length) {
      if (!this.currentDough) {
        const currentDough = this.doughs.find((dough) => dough.isChecked).id;
        this.$store.dispatch("Builder/setDough", currentDough);
      }
    }
  },
};
</script>

<style scoped></style>
