<template>
  <form
    v-show="isFormShown"
    ref="addressForm"
    action=""
    method="post"
    data-test="form"
    class="address-form address-form--opened sheet"
    @submit.prevent="submit"
  >
    <div class="address-form__header">
      <b data-test="address-number">Адрес №{{ this.addressIndex }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            ref="address"
            v-model="newAddress.name"
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            data-test="address-name"
          />
          <span>
            {{ validations.name.error }}
          </span>
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            v-model="newAddress.street"
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            data-test="street"
          />
          <span>
            {{ validations.street.error }}
          </span>
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            v-model="newAddress.building"
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            data-test="building"
          />
          <span>
            {{ validations.building.error }}
          </span>
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира*</span>
          <input
            v-model="newAddress.flat"
            type="text"
            name="addr-apartment"
            data-test="flat"
            placeholder="Введите № квартиры"
          />
          <span>
            {{ validations.flat.error }}
          </span>
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            v-model="newAddress.comment"
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
            data-test="comment"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        v-if="isEditShown"
        key="delete"
        type="button"
        class="button button--transparent"
        data-test="remove"
        @click="removeAddress"
      >
        Удалить
      </button>
      <button
        v-else
        key="close"
        type="button"
        class="button button--transparent"
        data-test="cancel"
        @click="$emit('closeForm')"
      >
        Отменить
      </button>
      <button
        type="submit"
        class="button">Сохранить</button>
    </div>
  </form>
</template>

<script>
import { validator } from "@/common/mixins";
import { addressFormStatus } from "@/common/const";
import { mapState } from "vuex";

export default {
  name: "ProfileForm",
  mixins: [validator],
  props: {
    editableAddressId: {
      type: Number,
      required: false,
    },

    addressIndex: {
      type: Number,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    newAddress: {
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      validations: {
        name: {
          error: "",
          rules: ["required"],
        },

        street: {
          error: "",
          rules: ["required"],
        },

        building: {
          error: "",
          rules: ["required"],
        },

        flat: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  computed: {
    ...mapState("Addresses", ["addresses", "formStatus"]),

    isFormShown() {
      return this.formStatus !== addressFormStatus.CLOSED;
    },

    isEditShown() {
      return this.formStatus === addressFormStatus.EDIT;
    },
  },

  mounted() {
    this.$refs.address.focus();
  },

  methods: {
    async removeAddress() {
      await this.$store.dispatch("Addresses/removeAddress", this.newAddress.id);
      this.$refs.addressForm.reset();
      this.$emit("closeForm");
    },

    async submit() {
      if (
        !this.$validateFields(
          {
            name: this.newAddress.name,
            street: this.newAddress.street,
            building: this.newAddress.building,
            flat: this.newAddress.flat,
          },
          this.validations
        )
      ) {
        return;
      }
      this.newAddress.userId = this.userId;
      if (this.formStatus === addressFormStatus.EDIT) {
        await this.$store.dispatch("Addresses/editAddress", this.newAddress);
      }
      if (this.formStatus === addressFormStatus.NEW) {
        await this.$store.dispatch("Addresses/addAddress", this.newAddress);
      }
      this.$refs.addressForm.reset();
      this.$emit("closeForm");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/blocks/address-form.scss";
</style>
