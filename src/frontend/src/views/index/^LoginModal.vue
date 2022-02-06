<template>
  <div class="modal-overlay">
    <Login></Login>
  </div>
</template>

<script>
import Login from "@/views/Login";
import { isLoggedIn } from "@/middlewares";

export default {
  name: "LoginModal",
  layout: "AppLayoutMain",
  middlewares: [isLoggedIn],
  components: { Login },
};
</script>
