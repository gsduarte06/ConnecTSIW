<template>
  <div>
    <base-table :data="tableData" thead-classes="text-primary">
      <template slot-scope="{ row }">
        <td>
          <div class="mb-8">
            <p class="title mb-0">{{ row.title }}</p>
            <p class="text-muted"></p>
            <p class="text-muted">Inicio: {{ row.date_inicio }}</p>
            <p class="text-muted" v-if="row.date_fim">
              Fim: {{ row.date_fim.replace("T", " ").replace(".000Z", "") }}
            </p>
          </div>
          <div class="text-center mb-3" v-if="row.image">
            <img
              :src="row.image"
              alt="Image"
              style="max-width: 450px; max-height: 300px; display: block; margin: 0 auto"
            />
          </div>
          <div class="text-center">
            <button type="button" class="btn btn-secondary mr-1">
              <i class="fas fa-thumbs-up"></i>{{ row.likes }}
            </button>
            <router-link :to="'/post/' + row.id" class="btn btn-secondary mr-1"
              ><i class="fas fa-comments"></i> Comments</router-link
            >
            <button
              type="button"
              class="btn btn-secondary mr-1"
              @click="openParticipantsModal(row)"
            >
              <i class="fas fa-user"></i> Participants
            </button>
          </div>
        </td>
      </template>
    </base-table>

    <!-- Modal -->
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <p>Post Title: {{ selectedPost.title }}</p>
          <p>Number of Participants: {{ selectedPost.participants }}</p>
          <table class="table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="participant in selectedPost" :key="participant.id_user">
                <td>{{ participant.id_user }}</td>
                <td>{{ participant.username }}</td>
                <td>
                  <a
                    class="btn btn-danger btn-sm"
                    :href="participant.CV"
                    target="_blank"
                    v-if="participant.CV"
                  >
                    <i class="fas fa-file-alt"></i> View CV</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <button
              type="button"
              class="btn btn-secondary mr-1"
              @click="closeParticipantsModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeParticipantsModal"
      ></button>
    </div>
  </div>
</template>

<script>
import { BaseTable } from "@/components";
import { usePostsStore } from "../store/posts";
import * as api from "../api/api";

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      showModal: false,
      selectedPost: {},
    };
  },
  async created() {
    await this.fetchPosts();
  },
  computed: {
    posts() {
      return usePostsStore().posts;
    },
    tableData() {
      return this.posts.map((item) => ({
        id: item.id_post,
        title: item.content,
        image: item.image,
        date: item.date_post,
        date_inicio: item.begin_date,
        date_fim: item.end_date,
        likes: item.likes,
        present_users: item.present_users,
      }));
    },
  },
  created() {},

  methods: {
    async fetchPosts() {
      try {
        await usePostsStore().fetchPosts();
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
    },
    async openParticipantsModal(post) {
      for (let presence of post.present_users) {
        let name = await api.get(`users/${presence.id_user}`);
        console.log(name);
        presence.username = name.username;
        presence.CV = name.CV;
      }
      this.selectedPost = post.present_users;
      console.log(post.present_users);
      this.showModal = true;
    },
    closeParticipantsModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.modal {
  display: none;
}

.modal.is-active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #201c24;
  padding: 20px;
  width: 60%;
  overflow: auto; /* Enable scrolling if table content exceeds modal size */
}

.modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  position: absolute;
  top: 10px;
  right: 10px;
}
.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}
</style>
