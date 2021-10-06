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
      <section class="footer">
        <div class="footer__more">
          <router-link class="button button--border button--arrow" to="/"
            >Хочу еще одну
          </router-link>
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: 2 228 ₽</b>
        </div>

        <div class="footer__submit">
          <button type="submit" class="button">Оформить заказ</button>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import CartList from "@/modules/cart/CartList";
import CartAdditional from "@/modules/cart/CartAdditional";
import CartForm from "@/modules/cart/CartForm";
import CartEmpty from "@/modules/cart/CartEmpty";
export default {
  name: "Cart",
  components: {
    CartEmpty,
    CartList,
    CartAdditional,
    CartForm,
  },
};
</script>
