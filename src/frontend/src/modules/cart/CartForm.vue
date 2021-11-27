<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="delivery"
          class="select"
          v-model="$store.state.Cart.delivery"
        >
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option v-for="(address, i) in addresses" :key="i" :value="i + 3">
            {{ address.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          v-model="$store.state.Cart.tel"
        />
      </label>

      <div class="cart-form__address" v-if="!isDeliveryPickup">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              v-model="$store.state.Cart.street"
              :disabled="isDisabledInputs"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              v-model="$store.state.Cart.house"
              :disabled="isDisabledInputs"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              v-model="$store.state.Cart.apartment"
              :disabled="isDisabledInputs"
            />
          </label>
        </div>
      </div>
      {{ addressOptions }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CartForm",
  computed: {
    isDeliveryPickup() {
      return +this.$store.state.Cart.delivery === 1;
    },
    isDisabledInputs() {
      return +this.$store.state.Cart.delivery >= 3;
    },
    addresses() {
      return this.$store.state.Auth.isAuthenticated
        ? this.$store.state.Addresses.addresses
        : [];
    },
    addressOptions() {
      const defaultAddressOptions = [{ 1: "Заберу сам" }, { 2: "Новый адрес" }];
      const formattedAddresses = this.addresses.map((address, i) => {
        return {
          [i + 3]: address.name,
        };
      });
      console.log(formattedAddresses);
      return defaultAddressOptions.concat(formattedAddresses);
    },
  },
};
</script>

<style scoped></style>
