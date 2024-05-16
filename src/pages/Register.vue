<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <card type="tasks">
            <template slot="header">
              <h6 class="title d-inline">
                Register
              </h6>
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
        newConfirmPassword: '',
      };
    },
    methods: {
      register() {
        console.log('Register: Email:', this.newEmail, 'Password:', this.newPassword);
        localStorage.setItem('isLoggedIn', true);
        this.$router.push('/dashboard');
      }
    }
  };
  </script>
  
  <style>
  </style>
  