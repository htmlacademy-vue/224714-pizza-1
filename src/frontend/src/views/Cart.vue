<template>
  <div>
    <form action="test.html" method="post" class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <CartEmpty v-if="$store.state.Cart.cart"></CartEmpty>

          <CartList></CartList>

          <CartAdditional></CartAdditional>

          <CartForm></CartForm>
        </div>
      </main>
      <CartFooter></CartFooter>
    </form>
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
};
</script>
