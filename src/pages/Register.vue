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
                <input type="text" class="form-control" id="user" v-model="newUser" required>
                <label for="newEmail">Email:</label>
                <input type="email" class="form-control" id="newEmail" v-model="newEmail" required>
              </div>
              <div class="form-group">
                <label for="newPassword">Password:</label>
                <input type="password" class="form-control" id="newPassword" v-model="newPassword" required>
                <label for="newConfirmPassword">Confirm Password:</label>
                <input type="password" class="form-control" id="newConfirmPassword" v-model="newConfirmPassword" required>
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
export default {
  data() {
    return {
      newEmail: '',
      newPassword: '',
      newUser: '',
      newConfirmPassword: ''
    };
  },
  methods: {
    async register() {
      if (this.newPassword !== this.newConfirmPassword) {
        alert("Passwords do not match");
        return;
      }
      
      try {
        const response = await fetch("http://localhost:8080/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.newUser,
            email: this.newEmail,
            password: this.newPassword,
            first_name: "Bruno", 
            last_name: "Silva",  
            nif: "123456789",       
            role: "Alumni" 
          })
        });
        
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        
        const data = await response.json();
        console.log("Registration successful:", data);
        localStorage.setItem("isLoggedIn", true);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error("Erro ao registrar:", error);
        alert("Registration failed: " + error.message);
      }
    }
  }
};
</script>

<style>
</style>