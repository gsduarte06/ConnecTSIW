<template>
  <div>
    <base-table :data="tableData" thead-classes="text-primary">
      <template slot-scope="{ row }">
        <td>
          <div class="mb-8">
            <p class="title mb-0">{{ row.title }}</p>
            <p></p>
            <p class="text-muted">Start date: {{ row.date_inicio }}</p>
            <p class="text-muted" v-if="row.date_fim">
              End Date: {{ row.date_fim.replace("T", " ").replace(".000Z", "") }}
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
            <button
              type="button"
              class="btn btn-secondary mr-1"
              @click="addLike(row.id)"
              :disabled="isLoggedUser"
            >
              <i class="fas fa-thumbs-up"></i>
              {{ row.likes }}
            </button>
            <router-link :to="'/post/' + row.id" class="btn btn-secondary mr-1"
              ><i class="fas fa-comments"></i> Comments</router-link
            >
            <button
              type="button"
              class="btn btn-secondary mr-1"
              @click="openModal(row)"
              :disabled="isLoggedUser"
            >
              <i class="fas fa-user"></i> Participate
            </button>
          </div>
        </td>
      </template>
    </base-table>

    <!-- Modal -->
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <div class="box">
          <p v-if="selectedPost.date_inicio">Starting Date: {{ selectedPost.date_inicio }}</p>
          <p v-if="selectedPost.date_fim">Ending Date: {{ selectedPost.date_fim.replace("T", " ").replace(".000Z", "") }}</p>
          <div class="text-right">
            <button type="button" class="btn btn-secondary mr-1" @click="closeModal">
              Close
            </button>
            <button v-if="!isParticipating" type="button" class="btn btn-primary" @click="participate">
              Participate
            </button>
            <button v-else type="button" class="btn btn-danger" @click="participate">
              Cancel Participation
            </button>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModal"
      ></button>
    </div>
  </div>
</template>

<script>
import { BaseTable } from "@/components";
import { usePostsStore } from "../store/posts";
import { useUserStore } from "../store/user";
import * as api from "../api/api";

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      showModal: false,
      selectedPost: {},
      users: [],
      userStore: useUserStore(),
      isParticipating: false, // Nova variável
    };
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
        present_users: item.usersP,
      }));
    },
    isLoggedUser() {
      return this.getStatus();
    },
  },
  methods: {
    getStatus() {
      return this.userStore.getToken == null;
    },
    async addLike(id) {
      const LikeData = {
        idUser: this.userStore.userId,
        idPost: id,
      };
      try {
        await api.post(`posts/${id}/likes`, LikeData, this.userStore.token);
      } catch (error) {
        console.log(error.msg);
        if ((error.msg = "like is already in the database")) {
          await api.del(`posts/${id}/likes`, this.userStore.token, LikeData);
        }
      }
      this.fetchPosts();
    },
    async fetchPosts() {
      try {
        await usePostsStore().fetchPosts();
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
    },
    async fetchUsers(post) {
      try {
        const userPromises = post.present_users.map(async (user) => {
          const userDetails = await api.get(`users/${user.id_user}`, this.userStore.token);
          return userDetails.data;
        });
        this.users = await Promise.all(userPromises);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    openModal(post) {
      this.selectedPost = post;
      this.checkUserParticipation(this.selectedPost.id);
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async checkUserParticipation(postId) {
      try {
        const response = await api.get(`posts/${postId}/present_users`, this.userStore.token);
        const userId = this.userStore.userId;
        this.isParticipating = response.some(item => item.id_user === userId);
      } catch (error) {
        console.error("Error checking user participation:", error);
      }
    },
    async participate() {
      const PartData = {
        idUser: this.userStore.userId,
        idPost: this.selectedPost.id,
      };
      try {
        await api.post(`posts/${this.selectedPost.id}/present_users`, PartData, this.userStore.token);
        this.closeModal()
      } catch (error) {
        if ((error.msg = "like is already in the database")) {
          await api.del(`posts/${this.selectedPost.id}/present_users`, this.userStore.token, PartData);
          this.closeModal()
        }
      }
      this.fetchPosts();
    },
  },
  async created() {
    await this.fetchPosts();
  },
};
</script>

<style scoped>
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
}
</style>