<template>
  <div class="sign-form">
    <a class="close close--white" data-test="close" @click="$router.go(-1)">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form method="post" data-test="form" @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            ref="email"
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            data-test="email"
          />
          <span>
            {{ validations.email.error }}
          </span>
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
            data-test="password"
          />
          <span>
            {{ validations.password.error }}
          </span>
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { validator } from "@/common/mixins";
import { isLoggedIn } from "@/middlewares";
export default {
  name: "Login",
  layout: "AppLayoutDefault",
  middlewares: [isLoggedIn],
  mixins: [validator],
  data: function () {
    return {
      email: "",

      password: "",

      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },

        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  watch: {
    email() {
      this.$clearValidationErrors();
    },

    password() {
      this.$clearValidationErrors();
    },
  },

  mounted() {
    this.$refs.email.focus();
  },

  methods: {
    async login() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      // Если поля валидны - отправляем запрос на сервер.
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });

      // После успешной авторизации отправляем пользователя на главную страницу.
      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/blocks/close.scss";
@import "@/assets/scss/blocks/input.scss";
@import "@/assets/scss/blocks/button.scss";
@import "@/assets/scss/blocks/title.scss";
</style>
