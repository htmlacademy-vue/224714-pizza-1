<template>
  <div class="sign-form">
    <a class="close close--white" @click="$router.go(-1)">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form method="post" @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            ref="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            v-model="email"
          />
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
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    async login() {
      // Если есть невалидное поле - не отправлять запрос на сервер.
      // Также в миксине мы присваиваем текст ошибки
      // if (!this.$validateFields(
      //   { email: this.email, password: this.password },
      //   this.validations
      // )) {
      //   return;
      // }
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
