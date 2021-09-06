<template>
  <div class="app-layout-main">
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
};
</script>
