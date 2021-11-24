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
          <b>Адрес №{{ i + 1 }}.</b>
          <div class="address-form__edit">
            <button type="button" class="icon">
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
        @submit.prevent="addAddress"
      >
        <div class="address-form__header">
          <b>Адрес №{{ addresses.length + 1 }}</b>
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
          <button type="button" class="button button--transparent">
            Удалить
          </button>
          <button type="submit" class="button">Сохранить</button>
        </div>
      </form>
    </div>

    <div class="layout__button">
      <button type="button" class="button button--border">
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
    };
  },
  created() {
    this.newAddress = [...this.defaultAddress];
  },
  mounted() {
    this.$refs.address.focus();
  },
  methods: {
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
      this.$set(this.newAddress, "userId", this.user.id);
      await this.$store.dispatch("Addresses/addAddress", this.newAddress);
      this.newAddress = Object.assign(this.defaultAddress);
    },
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Addresses", ["addresses"]),
  },
};
</script>
