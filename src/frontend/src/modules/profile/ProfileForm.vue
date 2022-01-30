<template>
  <form
    action=""
    method="post"
    class="address-form address-form--opened sheet"
    @submit.prevent="submit"
    v-show="isFormShown"
    ref="addressForm"
    data-test="form"
  >
    <div class="address-form__header">
      <b data-test="address-number">Адрес №{{ this.addressIndex }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            v-model="newAddress.name"
            ref="address"
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
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            v-model="newAddress.street"
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
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            v-model="newAddress.building"
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
            type="text"
            name="addr-apartment"
            v-model="newAddress.flat"
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
            type="text"
            name="addr-comment"
            v-model="newAddress.comment"
            placeholder="Введите комментарий"
            data-test="comment"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        v-if="isEditShown"
        type="button"
        class="button button--transparent"
        @click="removeAddress"
        data-test="remove"
      >
        Удалить
      </button>
      <button
        v-else
        type="button"
        class="button button--transparent"
        @click="$emit('closeForm')"
        data-test="cancel"
      >
        Отменить
      </button>
      <button type="submit" class="button">Сохранить</button>
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
  computed: {
    ...mapState("Addresses", ["addresses", "formStatus"]),
    isFormShown() {
      return this.formStatus !== addressFormStatus.CLOSED;
    },
    isEditShown() {
      return this.formStatus === addressFormStatus.EDIT;
    },
  },
};
</script>

<style scoped></style>
