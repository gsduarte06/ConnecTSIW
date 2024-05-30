<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <card type="tasks">
          <template slot="header">
            <h6 class="title d-inline">Register</h6>
          </template>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="user">Username:</label>
                <input
                  type="text"
                  class="form-control"
                  id="user"
                  v-model="newUser"
                  required
                />
              </div>
              <div class="form-group">
                <label for="newEmail">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  id="newEmail"
                  v-model="newEmail"
                  required
                />
              </div>
              <div class="form-group">
                <label for="newPassword">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  v-model="newPassword"
                  required
                />
              </div>
              <div class="form-group">
                <label for="newConfirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="newConfirmPassword"
                  v-model="newConfirmPassword"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../store/user"; // ajuste o caminho conforme necessário

export default {
  data() {
    return {
      newUser: "",
      newEmail: "",
      newPassword: "",
      newConfirmPassword: "",
    };
  },
  methods: {
    async register() {
      if (this.newPassword !== this.newConfirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const userStore = useUserStore();
      try {
        await userStore.register({
          username: this.newUser,
          email: this.newEmail,
          password: this.newPassword,
          first_name: "",
          last_name: "",
          role: "regular",
          nif: "",
        });
        await userStore.login({ username: this.newUser, password: this.newPassword });
        localStorage.setItem("isLoggedIn", true);
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed: " + error.message);
      }
    },
  },
};
</script>

<style></style>
