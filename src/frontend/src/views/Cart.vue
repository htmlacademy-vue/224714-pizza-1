<template>
  <div>
    <form
      action=""
      method="post"
      class="layout-form"
      @submit.prevent="checkForm"
    >
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <CartEmpty v-if="!$store.state.Cart.pizzas.length"></CartEmpty>

          <div v-else>
            <CartList></CartList>

            <CartAdditional></CartAdditional>

            <CartForm :validations="validations"></CartForm>
          </div>
        </div>
      </main>
      <CartFooter></CartFooter>
    </form>
    <router-view name="modal"></router-view>
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
export default {
  name: "Cart",
  mixins: [validator],
  components: {
    CartFooter,
    CartEmpty,
    CartList,
    CartAdditional,
    CartForm,
  },
  methods: {
    checkForm() {
      if (this.$store.state.Cart.addressOption === DEFAULT_ADDRESS_OPTION) {
        //самовывоз
        if (
          !this.$validateFields(
            {
              phone: this.$store.state.Cart.phone,
            },
            this.validations
          )
        ) {
          console.log(this.$store.state.Cart.phone);
          return;
        }
      } else {
        //доставка
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
      this.$router.push({ path: `/thanks-popup` });
    },
  },
  computed: {
    ...mapState("Cart", ["address"]),
    validations() {
      let validations;
      if (this.$store.state.Cart.addressOption === DEFAULT_ADDRESS_OPTION) {
        validations = {
          phone: {
            error: "",
            rules: ["required"],
          },
        };
      } else {
        validations = {
          phone: {
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
        };
      }
      return validations;
    },
  },
};
</script>

<style scoped>
.cart {
  min-height: calc(100vh - 188px);
}
</style>
