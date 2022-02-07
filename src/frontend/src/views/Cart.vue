<template>
  <div>
    <form
      action=""
      method="post"
      class="layout-form"
      data-test="form"
      @submit.prevent="checkForm"
    >
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <CartEmpty
            v-if="!$store.state.Cart.pizzas.length"
            data-test="empty"
          />

          <div v-else data-test="not-empty">
            <CartList />

            <CartAdditional />

            <CartForm :validations="validations" />
          </div>
        </div>
      </main>
      <CartFooter />
    </form>
    <transition name="fade" mode="in-out">
      <ThePopup v-if="isSuccessPopupShown" data-test="popup" />
    </transition>
  </div>
</template>

<script>
import CartList from "@/modules/cart/CartList";
import CartAdditional from "@/modules/cart/CartAdditional";
import CartForm from "@/modules/cart/CartForm";
import CartEmpty from "@/modules/cart/CartEmpty";
import CartFooter from "@/modules/cart/CartFooter";
import { validator } from "@/common/mixins";
import { mapState } from "vuex";
import { DEFAULT_ADDRESS_OPTION } from "@/common/const";
import ThePopup from "@/modules/cart/CartPopup";

export default {
  name: "Cart",
  layout: "AppLayoutMain",
  components: {
    ThePopup,
    CartFooter,
    CartEmpty,
    CartList,
    CartAdditional,
    CartForm,
  },
  mixins: [validator],
  data() {
    return {
      validations: this.defineValidations(),
    };
  },
  computed: {
    ...mapState("Cart", ["address", "isSuccessPopupShown"]),
  },
  methods: {
    checkForm() {
      if (this.$store.state.Cart.addressOption === DEFAULT_ADDRESS_OPTION) {
        //самовывоз
        this.validations = Object.assign(this.defineValidations());
        if (
          !this.$validateFields(
            {
              phone: this.$store.state.Cart.phone,
            },
            this.validations
          )
        ) {
          return;
        }
      } else {
        //доставка
        this.validations = Object.assign(this.defineValidations("required"));
        if (
          !this.$validateFields(
            {
              phone: this.$store.state.Cart.phone,
              street: this.$store.state.Cart.address.street,
              building: this.$store.state.Cart.address.building,
              flat: this.$store.state.Cart.address.flat,
            },
            this.validations
          )
        ) {
          return;
        }
      }
      this.sendOrder();
    },

    sendOrder() {
      const order = this.$store.getters["Cart/order"];
      this.$store.dispatch("Orders/post", order);
      this.$store.dispatch("Cart/toggleSuccessPopup", true);
    },

    defineValidations(isExtraFieldsRequired) {
      return {
        phone: {
          error: "",
          rules: ["required"],
        },
        street: {
          error: "",
          rules: [isExtraFieldsRequired],
        },
        building: {
          error: "",
          rules: [isExtraFieldsRequired],
        },
        flat: {
          error: "",
          rules: [isExtraFieldsRequired],
        },
      };
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/blocks/input.scss";
</style>

<style scoped>
.cart {
  min-height: calc(100vh - 188px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}
.fade-enter-to {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
</style>
