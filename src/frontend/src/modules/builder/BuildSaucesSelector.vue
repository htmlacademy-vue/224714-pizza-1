<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      class="radio ingredients__input"
      v-for="(sauce, i) in sauces"
      :key="i"
      data-test="label"
    >
      <RadioButton
        :name="`sauce`"
        :value="sauce.id"
        :isChecked="sauce.id === currentSauce"
        @valueChanged="$store.dispatch(`Builder/setSauce`, $event)"
        data-test="radio"
      ></RadioButton>
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
import RadioButton from "@/components/RadioButton";
import { mapGetters } from "vuex";
import { DEFAULT_SAUCE_ARRAY_INDEX } from "@/common/const";

export default {
  name: "BuildSaucesSelector",
  components: { RadioButton },
  created() {
    if (this.sauces && this.sauces.length) {
      if (!this.currentSauce) {
        const currentSauce = this.sauces[DEFAULT_SAUCE_ARRAY_INDEX].id;
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

<style scoped></style>
