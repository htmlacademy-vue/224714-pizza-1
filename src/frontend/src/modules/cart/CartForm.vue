<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <select
          name="delivery"
          class="select"
          :value="addressOption"
          @change="addressChanged($event)"
        >
          <option
            v-for="(address, i) in addressOptions"
            :key="i"
            :selected="address.index === defaultAddressOption"
            :value="address.index"
          >
            {{ address.text }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="phone"
          placeholder="+7 999-999-99-99"
          :value="phone"
          @change="phoneChanged"
        />
        <div>
          {{ validations.phone.error }}
        </div>
      </label>

      <div class="cart-form__address" v-if="!isDeliveryPickup">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :value="address.street"
              @change="addressPartlyChanged($event, `street`)"
              :disabled="isDisabledInputs"
            />
            <div>
              {{ validations.street.error }}
            </div>
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="building"
              :value="address.building"
              @change="addressPartlyChanged($event, `building`)"
              :disabled="isDisabledInputs"
            />
            <div>
              {{ validations.building.error }}
            </div>
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="flat"
              :value="address.flat"
              @change="addressPartlyChanged($event, `flat`)"
              :disabled="isDisabledInputs"
            />
            <div>
              {{ validations.flat.error }}
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DEFAULT_ADDRESS_OPTION, defaultAddressOptions } from "@/common/const";
import { defaultAddress, getAddressIndex } from "@/common/helpers";
import { mapState } from "vuex";
export default {
  name: "CartForm",
  props: {
    validations: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      defaultAddressOption: DEFAULT_ADDRESS_OPTION,
    };
  },
  beforeCreate() {
    if (this.$store.state.Auth.isAuthenticated) {
      this.$store.dispatch("Addresses/getAddresses");
    }
  },
  methods: {
    addressChanged(event) {
      this.$store.dispatch("Cart/setAddressOption", event.target.value);
      this.$store.dispatch("Cart/setAddress", this.address);
    },
    phoneChanged(event) {
      this.$store.commit("Cart/setPhone", event.target.value);
    },
    addressPartlyChanged(event, option) {
      let address = Object.assign({}, this.$store.state.Cart.address);
      address[option] = event.target.value;
      this.$store.commit("Cart/setAddress", address);
    },
  },
  computed: {
    ...mapState("Cart", ["addressOption", "phone"]),
    isDeliveryPickup() {
      return this.addressOption === DEFAULT_ADDRESS_OPTION;
    },
    isDisabledInputs() {
      return this.addressOption >= defaultAddressOptions.length + 1;
    },
    addresses() {
      return this.$store.state.Auth.isAuthenticated
        ? this.$store.state.Addresses.addresses
        : [];
    },
    addressOptions() {
      let formattedAddresses = this.addresses.map((address, i) => {
        return {
          index: getAddressIndex(i),
          text: address.name,
          address: address,
        };
      });
      return defaultAddressOptions.concat(formattedAddresses);
    },
    address() {
      return (
        this.addressOptions.find(
          (option) => +option.index === +this.addressOption
        ).address || defaultAddress
      );
    },
  },
};
</script>

<style scoped></style>
