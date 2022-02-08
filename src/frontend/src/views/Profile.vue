<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <source
          type="image/webp"
          :srcset="user.avatar"
          data-test="source" />
        <img
          :src="user.avatar"
          :srcset="user.avatar"
          :alt="user.name"
          width="72"
          height="72"
          data-test="image"
        />
      </picture>
      <div class="user__name">
        <span data-test="user-name">{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span data-test="user-phone">{{ user.phone }}</span>
      </p>
    </div>

    <div
      v-for="(address, i) in addresses"
      :key="address.id"
      data-test="address"
      class="layout__address"
    >
      <div class="sheet address-form">
        <div class="address-form__header">
          <b data-test="address-name">Адрес №{{ i + 1 }}. {{ address.name }}</b>
          <div class="address-form__edit">
            <button
              type="button"
              class="icon"
              data-test="change-btn"
              @click="onEditClick(address.id, i + 1)"
            >
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p data-test="address-full">
          {{ address.street }}, д. {{ address.building }}, кв.
          {{ address.flat }}
        </p>
        <small data-test="comment">{{ address.comment }}</small>
      </div>
    </div>

    <div class="layout__address">
      <ProfileForm
        :editable-address-id="editableAddressId"
        :address-index="addressIndex"
        :user-id="user.id"
        :new-address="newAddress"
        data-test="profile-form"
        @closeForm="closeForm"
      />
    </div>

    <div class="layout__button">
      <button
        :disabled="isBtnActive"
        type="button"
        class="button button--border"
        data-test="new-address-btn"
        @click="onAddNewClick"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileForm from "@/modules/profile/ProfileForm";
import { addressFormStatus } from "@/common/const";
import { defaultAddress } from "@/common/helpers";
import { auth } from "@/middlewares";
export default {
  name: "Profile",
  layout: "AppLayoutProfile",
  middlewares: [auth],
  components: { ProfileForm },
  data() {
    return {
      addressIndex: 0, //порядковый номер в списке заказов, не используется в базе
      editableAddressId: 0,
      newAddress: {},
    };
  },

  computed: {
    ...mapState("Auth", ["user"]),

    ...mapState("Addresses", ["addresses", "formStatus"]),

    isBtnActive() {
      return this.formStatus !== addressFormStatus.CLOSED;
    },
  },

  beforeCreate() {
    this.$store.dispatch("Addresses/getAddresses");
  },

  created() {
    this.newAddress = defaultAddress;
  },

  methods: {
    onEditClick(id, index) {
      this.editableAddressId = id;
      this.addressIndex = index;
      if (
        this.formStatus === addressFormStatus.EDIT &&
        this.newAddress.id === this.editableAddressId
      ) {
        //схлопнуть открытую форму редактирования при клике по её карандашу
        this.closeForm();
        return;
      }
      this.newAddress = this.addresses.find((address) => address.id === id);
      this.$store.dispatch("Addresses/setFormStatus", addressFormStatus.EDIT);
    },

    onAddNewClick() {
      this.addressIndex = this.addresses.length + 1;
      this.newAddress = defaultAddress;
      this.$store.dispatch("Addresses/setFormStatus", addressFormStatus.NEW);
    },

    closeForm() {
      this.newAddress = defaultAddress;
      this.$store.dispatch("Addresses/setFormStatus", addressFormStatus.CLOSED);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/blocks/icon.scss";
@import "@/assets/scss/blocks/input.scss";
@import "@/assets/scss/blocks/button.scss";
@import "@/assets/scss/blocks/title.scss";
@import "@/assets/scss/blocks/user.scss";
@import "@/assets/scss/blocks/address-form.scss";
</style>
<style scoped>
.layout__content {
  padding-bottom: 40px;
}
</style>
