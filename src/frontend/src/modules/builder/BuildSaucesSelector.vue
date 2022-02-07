<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="(sauce, i) in sauces"
      :key="i"
      class="radio ingredients__input"
      data-test="label"
    >
      <AppRadioButton
        :name="`sauce`"
        :value="sauce.id"
        :is-checked="sauce.id === currentSauce"
        @valueChanged="$store.dispatch(`Builder/setSauce`, $event)"
        data-test="radio"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
import AppRadioButton from "@/components/AppRadioButton";
import { mapGetters } from "vuex";
export default {
  name: "BuildSaucesSelector",
  components: { AppRadioButton },
  created() {
    if (this.sauces && this.sauces.length) {
      if (!this.currentSauce) {
        const currentSauce = this.sauces.find((sauce) => sauce.isChecked).id;
        this.$store.dispatch("Builder/setSauce", currentSauce);
      }
    }
  },
  computed: {
    ...mapGetters("Builder", ["sauces"]),

    currentSauce() {
      return this.$store.state.Builder.sauce;
    },
  },
};
</script>

<style lang="scss" scoped></style>
