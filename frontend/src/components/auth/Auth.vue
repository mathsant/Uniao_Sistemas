<template>
    <div class="auth-content">
        <div class="auth-modal">
            <form @submit.prevent="login">
              <h2><i class="fa fa-wrench"></i> União<strong>Sistemas</strong></h2>
              <hr>
              <div class="auth-title">Login</div>
              <input type="text" v-model="user.email" name="email" placeholder="E-mail" required>
              <input type="password" v-model="user.password" name="password" placeholder="Senha" required>
              <b-button type="submit" block variant="primary">Entrar</b-button>
            </form>
        </div>
    </div>
</template>

<script>
import { showError } from "../../global";

export default {
  name: "Auth",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      this.$http
        .post(`/auth`, this.user)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          this.$router.push({ name: "home" });
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  border-radius: 7px;
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  text-align: center;
  font: bold;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  border-radius: 7px;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
