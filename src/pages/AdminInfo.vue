<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow-sm">
          <div
            class="card-header bg-primary text-white d-flex justify-content-between align-items-center"
          >
            <h6 class="title d-inline">User Management</h6>
            <router-link to="/admin" class="btn btn-sm">
              <i class="fas fa-arrow-left"></i> Return to Admin
            </router-link>
          </div>
          <div class="card-body">
            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id_user">
                  <td>{{ user.id_user }}</td>
                  <td>{{ user.username }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <button class="btn btn-info btn-sm" @click="openModal(user)">
                      <i class="fa fa-info-circle"></i> Detail
                    </button>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="deleteUser(user.id_user)"
                    >
                      <i class="fa fa-trash-alt"></i> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div v-if="selectedUser">
            <p class="text-muted">Personal Info</p>
            <p></p>

            <p>User ID: {{ selectedUser.id_user }}</p>
            <p>Username: {{ selectedUser.username }}</p>
            <p v-if="selectedUser.first_name">
              Full Name: {{ selectedUser.first_name + " " + selectedUser.last_name }}
            </p>

            <p v-if="selectedUser.CV">
              CV:
              <a
                class="btn btn-danger btn-sm"
                :href="selectedUser.CV"
                target="_blank"
                v-if="selectedUser.CV"
              >
                <i class="fas fa-file-alt"></i> View CV</a
              >
            </p>
            <hr class="hrDivider" />
            <p class="text-muted" v-if="currentJob.position">
              Current Job: {{ currentJob.position }}
            </p>
            <div v-if="currentJob.position != 'Unemployed'">
              <p>District: {{ currentJob.district }}</p>
              <p>Begin Date: {{ currentJob.begin_date }}</p>
            </div>
          </div>

          <div class="text-right">
            <button type="button" class="btn btn-secondary mr-1" @click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../store/user";
import * as api from "../api/api";

export default {
  data() {
    return {
      userStore: useUserStore(),
      showModal: false,
      selectedUser: null,
      currentJob: null,
    };
  },
  methods: {
    async deleteUser(userId) {
      // Logic to delete the user
      if (confirm("Are you sure you want to delete this user?")) {
        await this.userStore.deleteUser(userId);
        alert("User deleted successfully!");
      }
    },
    async openModal(user) {
      this.selectedUser = user;
      this.currentJob = await api.get(
        `users/${user.id_user}/backgrounds`,
        this.userStore.token
      );
      if (this.currentJob.length != 0) {
        this.currentJob = this.currentJob[0];
        if (this.currentJob.end_date == null) {
          console.log(this.currentJob);
          let districts = await api.get(`districts`, this.userStore.token);
          this.currentJob.district = districts.find(
            (d) => d.id_district === this.currentJob.id_district
          ).district;

          let position = await api.get(`positions`, this.userStore.token);
          this.currentJob.position = position.find(
            (d) => d.id_position === this.currentJob.id_position
          ).position_desc;
        }
        this.currentJob = { position: "Unemployed" };
      } else {
        this.currentJob = { position: "Unemployed" };
      }

      console.log(this.currentJob);
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  computed: {
    users() {
      return this.userStore.users;
    },
  },
  async mounted() {
    await this.userStore.fetchAllUsers();
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
.hrDivider {
  background-color: gray;
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

.modal.is-active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-background {
  background-color: rgba(32, 28, 44, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.modal-content {
  background: #201c2c;
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
}

.box {
  padding: 1rem;
}

.text-right {
  text-align: right;
}
</style>
