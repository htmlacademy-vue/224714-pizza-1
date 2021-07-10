<template>
  <ul>
    <li><a href="welcome.html">Страница приветствия</a></li>
    <li><a href="main.html">Главная</a></li>
    <li><a href="cart.html">Корзина</a></li>
    <li><a href="orders.html">История заказов</a></li>
    <li><a href="popup.html">Попап "Спасибо за заказ"</a></li>
    <li><a href="sign-in.html">Авторизация</a></li>
    <li><a href="user-data.html">Мои данные</a></li>
  </ul>
</template>

<script>
import misc from "../static/misc.json";
import pizza from "../static/pizza.json";
import user from "../static/user.json";

export default {
  name: "Index",
  data() {
    return {
      misc,
      pizza,
      user,
    };
  },
};
</script>

<style scoped></style>
