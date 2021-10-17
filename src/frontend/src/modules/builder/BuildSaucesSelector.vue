<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      class="radio ingredients__input"
      v-for="(sauce, i) in sauces"
      :key="i"
    >
      <RadioButton
        :name="`sauce`"
        :value="sauce.value"
        :isChecked="sauce.value === currentSauce"
      ></RadioButton>
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
import RadioButton from "@/components/RadioButton";
import { mapGetters } from "vuex";
export default {
  name: "BuildSaucesSelector",
  components: { RadioButton },
  computed: {
    ...mapGetters("Builder", ["sauces"]),
    currentSauce() {
      if (!this.$store.state.Builder.sauce) {
        const currentSauce = this.sauces.find((sauce) => sauce.isChecked).value;
        this.$store.dispatch("Builder/setSauce", currentSauce);
      }
      return this.$store.state.Builder.sauce;
    },
  },
};
</script>

<style scoped></style>
