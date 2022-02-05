<template>
  <div class="sign-form">
    <a class="close close--white" @click="$router.go(-1)" data-test="close">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form method="post" @submit.prevent="login" data-test="form">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            ref="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            v-model="email"
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
            type="password"
            name="pass"
            placeholder="***********"
            v-model="password"
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
  middlewares: [isLoggedIn],
  layout: "AppLayoutDefault",
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
