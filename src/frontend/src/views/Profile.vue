<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <source type="image/webp" :srcset="user.avatar" />
        <img
          :src="user.avatar"
          :srcset="user.avatar"
          :alt="user.name"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <div class="layout__address" v-for="(address, i) in addresses" :key="i">
      <div class="sheet address-form">
        <div class="address-form__header">
          <b>Адрес №{{ i + 1 }}. {{ address.name }}</b>
          <div class="address-form__edit">
            <button
              type="button"
              class="icon"
              @click="onEditClick(address.id, i + 1)"
            >
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>
          {{ address.street }}, д. {{ address.building }}, кв.
          {{ address.flat }}
        </p>
        <small>{{ address.comment }}</small>
      </div>
    </div>

    <div class="layout__address">
      <form
        action=""
        method="post"
        class="address-form address-form--opened sheet"
        @submit.prevent="submit"
        v-show="isFormShown"
      >
        <div class="address-form__header">
          <b>Адрес №{{ newAddress.index }}</b>
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
                required
              />
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
                required
              />
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
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <input
                type="text"
                name="addr-apartment"
                v-model="newAddress.flat"
                placeholder="Введите № квартиры"
              />
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
              />
            </label>
          </div>
        </div>

        <div class="address-form__buttons">
          <button
            v-if="isEditForm"
            type="button"
            class="button button--transparent"
            @click="removeAddress(newAddress.id)"
          >
            Удалить
          </button>
          <button
            v-else
            type="button"
            class="button button--transparent"
            @click="isNewForm = false"
          >
            Отменить
          </button>
          <button type="submit" class="button">Сохранить</button>
        </div>
      </form>
    </div>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="isNewForm = true"
        :disabled="isEditForm"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validator } from "@/common/mixins";
export default {
  name: "Profile",
  mixins: [validator],
  data() {
    return {
      defaultAddress: {
        name: "",
        userId: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
      newAddress: {},
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
      },
      isEditForm: false,
      isNewForm: false,
    };
  },
  created() {
    this.newAddress = Object.assign(this.defaultAddress);
  },
  mounted() {
    this.$refs.address.focus();
  },
  methods: {
    onEditClick(id, index) {
      if (this.isEditForm && this.newAddress.id === id) {
        this.isEditForm = false;
        return;
      }
      this.isEditForm = true;
      this.newAddress = this.addresses.find((address) => address.id === id);
      this.newAddress.index = index;
    },
    async removeAddress(id) {
      await this.$store.dispatch("Addresses/removeAddress", id);
      this.isEditForm = false;
      this.newAddress = Object.assign(this.defaultAddress);
    },
    async addAddress() {
      if (
        !this.$validateFields(
          {
            name: this.newAddress.name,
            street: this.newAddress.street,
            building: this.newAddress.building,
          },
          this.validations
        )
      ) {
        return;
      }
      this.newAddress.userId = this.user.id;
      this.newAddress.index = this.addAddress.length + 1;
      await this.$store.dispatch("Addresses/addAddress", this.newAddress);

      this.newAddress = Object.assign(this.defaultAddress);
    },
    async editAddress() {
      if (
        !this.$validateFields(
          {
            name: this.newAddress.name,
            street: this.newAddress.street,
            building: this.newAddress.building,
          },
          this.validations
        )
      ) {
        return;
      }
      this.newAddress.userId = this.user.id;
      this.$delete(this.newAddress, "index");
      await this.$store.dispatch("Addresses/editAddress", this.newAddress);

      this.newAddress = Object.assign(this.defaultAddress);
      this.isEditForm = false;
    },
    submit() {
      if (this.isNewForm) {
        this.addAddress();
      } else {
        //edit form
        this.editAddress();
      }
    },
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Addresses", ["addresses"]),
    isFormShown() {
      return this.isEditForm || this.isNewForm;
    },
  },
};
</script>

<style>
.layout__content {
  padding-bottom: 40px;
}
</style>
