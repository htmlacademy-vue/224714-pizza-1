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
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="val"
      ref="counter"
    />
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
import {
  FILLING_COUNTER_MIN_VALUE,
  FILLING_COUNTER_MAX_VALUE,
} from "../common/const";

export default {
  name: "ItemCounter",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      val: this.value,
    };
  },
  methods: {
    plusOne() {
      if (this.val === FILLING_COUNTER_MAX_VALUE) {
        return false;
      }
      this.val += 1;
      this.$emit("valueChanged", { value: this.val, name: this.name });
    },
    minusOne() {
      if (this.val === FILLING_COUNTER_MIN_VALUE) {
        return false;
      }
      this.val -= 1;
      this.$emit("valueChanged", { value: this.val, name: this.name });
    },
  },
  watch: {
    val: function (val) {
      if (val === FILLING_COUNTER_MAX_VALUE) {
        this.$emit("disableDragging", true);
        console.log('false ' + val);
      } else {
        this.$emit("disableDragging", false);
      }
    },
  },
};
</script>

<style scoped></style>
