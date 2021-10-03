<template>
  <div :class="`counter counter--orange ${name}__counter`">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="minusOne"
      :disabled="val === 0"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="val" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="val === 3"
      @click="plusOne"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    name: {
      type: String,
      required: true,
    },
    ingredient: {
      type: String,
    },
  },
  methods: {
    plusOne() {
      this.$store.dispatch("Builder/plusOneIngredient", this.ingredient);
    },
    minusOne() {
      this.$store.dispatch("Builder/minusOneIngredient", this.ingredient);
    },
  },
  computed: {
    val() {
      return this.$store.state.Builder.filling[this.ingredient] || 0;
    },
  },
};
</script>

<style scoped></style>
