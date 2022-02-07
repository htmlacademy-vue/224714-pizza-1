<template>
  <div>
    <transition :name="animation.name" :mode="animation.mode">
      <component :is="layout">
        <slot />
      </component>
    </transition>
  </div>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  data() {
    return {
      animation: Object,
    };
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
  watch: {
    $route: function (newRoute, oldRoute) {
      this.animation = { name: "slide", mode: "out-in" };
      if (newRoute.name === "LoginModal") {
        this.animation.name = "fade";
        this.animation.mode = "in-out";
      }
      if (newRoute.name === "Index" && oldRoute.name === "LoginModal") {
        this.animation.mode = "in-out";
      }
    },
  },
};
</script>

<style>
.slide-enter-active {
  transition: all 0.4s;
}
.slide-enter {
  opacity: 0;
  margin-left: 90px;
}
.slide-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-left: -100px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<style lang="scss" scoped>
@import "@/assets/scss/app";
@import "@/assets/scss/fonts";
@import "@/assets/scss/scaffolding";
@import "@/assets/scss/visually-hidden";
</style>
