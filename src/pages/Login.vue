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
                <input type="text" class="form-control" id="user" v-model="username" required />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" v-model="password" required />
              </div>
              <router-link to="/register" class="btn btn-link">Don't Have an Account?</router-link>
              <br />
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://localhost:8080/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        
        const data = await response.json();
        localStorage.setItem("token", data.accessToken);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }
  }
};
</script>

<style>
</style>