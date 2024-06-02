<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h6 class="title d-inline">
              User Management
            </h6>
            <router-link to="/admin" class="btn  btn-sm">
              <i class="fas fa-arrow-left"></i> Return to Admin
            </router-link>
          </div>
          <div class="card-body">
            <table class="table table-hover">
              <thead class="thead-light">
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
                    <router-link 
                      :to="{ name: 'UserDetail', params: { id: user.id }}" 
                      class="btn btn-info btn-sm mr-2">
                      <i class="fas fa-info-circle"></i> View
                    </router-link>
                    <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">
                      <i class="fas fa-trash-alt"></i> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
.container {
  margin-top: 20px;
}

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.card-body {
  padding: 20px;
}

.table {
  margin-top: 20px;
}

.table thead {
  background-color: #f8f9fa;
  color: #212529;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.button-link {
  text-decoration: none;
  color: white;
}

.btn-info {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn i {
  margin-right: 5px;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
}

.btn-light {
  background-color: #f8f9fa;
  border-color: #f8f9fa;
  color: #212529;
}

.btn-light:hover {
  background-color: #e2e6ea;
}
</style>
