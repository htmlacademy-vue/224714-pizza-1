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
        data-test="radio"
        @valueChanged="$store.dispatch(`Builder/setSauce`, $event)"
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
  computed: {
    ...mapGetters("Builder", ["sauces"]),

    currentSauce() {
      return this.$store.state.Builder.sauce;
    },
  },

  created() {
    if (this.sauces && this.sauces.length) {
      if (!this.currentSauce) {
        const currentSauce = this.sauces.find((sauce) => sauce.isChecked).id;
        this.$store.dispatch("Builder/setSauce", currentSauce);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins/m_center.scss";
@import "@/assets/scss/blocks/radio.scss";
</style>
