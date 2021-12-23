<template>
  <div class="app-layout-profile">
    <AppLayoutHeader />
    <div class="layout__sidebar sidebar">
      <router-link to="/" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
      <router-link class="layout__link" to="/orders"
        >История заказов</router-link
      >
      <router-link class="layout__link" to="/profile">Мои данные</router-link>
    </div>
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutProfile",
  components: {
    AppLayoutHeader,
  },
};
</script>
