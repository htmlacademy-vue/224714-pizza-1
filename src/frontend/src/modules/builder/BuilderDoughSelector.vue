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
            :isChecked="dough.isChecked"
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

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  props: {
    doughs: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
