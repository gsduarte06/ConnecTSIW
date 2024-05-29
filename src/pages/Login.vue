<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <card type="tasks">
          <template slot="header">
            <h6 class="title d-inline">Login</h6>
          </template>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="user">Username:</label>
                <input type="text" class="form-control" id="user" v-model="user" required>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <router-link to="/register" class="btn btn-link">Don't Have an Account?</router-link>
              <br>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../store/user';

export default {
  data() {
    return {
      user: '',
      password: ''
    };
  },
  methods: {
    async login() {
      const userStore = useUserStore();
      try {
        await userStore.login({ username: this.user, password: this.password });
        localStorage.setItem('isLoggedIn', true);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed: " + error.message);
      }
    }
  }
};
</script>

<style>
</style>