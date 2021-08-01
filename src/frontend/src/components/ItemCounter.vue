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
import {
  FILLING_COUNTER_MIN_VALUE,
  FILLING_COUNTER_MAX_VALUE,
} from "../common/const";
import EventBus from "@/common/event-bus";

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
    ingredient: {
      type: String,
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
      this.$emit("valueChanged", { value: this.val, name: this.ingredient });
    },
    minusOne() {
      if (this.val === FILLING_COUNTER_MIN_VALUE) {
        return false;
      }
      this.val -= 1;
      this.$emit("valueChanged", { value: this.val, name: this.ingredient });
    },
  },
  watch: {
    val: function (val) {
      if (val === FILLING_COUNTER_MAX_VALUE) {
        this.$emit("disableDragging", true);
        console.log("false " + val);
      } else {
        this.$emit("disableDragging", false);
      }
    },
  },
  mounted() {
    EventBus.$on("ingredientDropped", (ingredient) => {
      if (this.ingredient === ingredient) {
        console.log(this.ingredient);
        this.plusOne();
      }
    });
  },
};
</script>

<style scoped></style>
