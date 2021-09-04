<template>
  <div class="modal-overlay">
    <Login></Login>
  </div>
</template>

<script>
import Login from "@/views/Login";
export default {
  name: "LoginModal",
  components: { Login },
};
</script>
