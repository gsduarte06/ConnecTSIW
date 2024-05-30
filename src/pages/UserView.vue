<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <card type="tasks">
          <template slot="header">
            <h6 class="title d-inline">User Details</h6>
          </template>
          <div class="card-body">
            <p><strong>ID:</strong> {{ user.id }}</p>
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <!-- Additional user details here -->
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { useUserStore } from "../store/user";
export default {
  data() {
    return {
      user: null,
      userStore: useUserStore(),
    };
  },
  created() {},
  methods: {
    fetchUser(userId) {
      // Replace this with an actual API call
      const users = [
        { id: 1, username: "user1", email: "user1@example.com" },
        { id: 2, username: "user2", email: "user2@example.com" },
        { id: 3, username: "user3", email: "user3@example.com" },
        // Additional user data...
      ];
      this.user = users.find((user) => user.id === parseInt(userId));
    },
  },
};
</script>
<style scoped>
.card-body {
  padding: 20px;
}
</style>
