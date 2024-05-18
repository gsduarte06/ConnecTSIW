<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <card type="tasks">
            <template slot="header">
              <h6 class="title d-inline">
                User Management
              </h6>
            </template>
            <div class="card-body">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                      <router-link to="/admin/admininfo/userdetail" class="button-link">User Detail</router-link>
                      <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
      users: [
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' },
        { id: 3, username: 'user3', email: 'user3@example.com' },
        // Additional user data...
      ],
    };
  },
  methods: {
    viewUser(userId) {
      // Logic to view user details, possibly navigating to a user detail page
      this.$router.push({ name: 'UserDetail', params: { id: userId } });
    },
    deleteUser(userId) {
      // Logic to delete the user
      if (confirm('Are you sure you want to delete this user?')) {
        this.users = this.users.filter(user => user.id !== userId);
        alert('User deleted successfully!');
      }
    },
  },
};
</script>
<style scoped>
.table {
  margin-top: 20px;
}
</style>
  