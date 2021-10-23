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

            <CartForm></CartForm>
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
export default {
  name: "Cart",
  components: {
    CartFooter,
    CartEmpty,
    CartList,
    CartAdditional,
    CartForm,
  },
  methods: {
    checkForm() {
      if (this.$store.state.Cart.delivery === 1) {
        //самовывоз
        if (this.$store.state.Cart.tel.length) {
          this.sendOrder();
        }
      } else {
        //доставка
        if (
          this.$store.state.Cart.tel.length &&
          this.$store.state.Cart.street.length &&
          this.$store.state.Cart.house.length
        ) {
          this.sendOrder();
        }
      }
    },
    sendOrder() {
      const order = this.$store.getters["Cart/order"];
      //todo succes запроса:
      this.$store.dispatch("Orders/addOrder", order);
      this.$router.push({ path: `/thanks-popup` });
    },
  },
};
</script>
