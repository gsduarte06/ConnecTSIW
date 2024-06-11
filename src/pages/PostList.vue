<template>
  <div>
    <base-table :data="tableData" thead-classes="text-primary">
      <template slot-scope="{ row }">
        <td>
          <div class="mb-8">
            <p class="title mb-0">{{ row.title }}</p>
            <p></p>
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
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <p>Data de Início: {{ selectedPost.date_inicio }}</p>
          <div class="text-right">
            <button type="button" class="btn btn-secondary mr-1" @click="closeModal">
              Fechar
            </button>
            <button type="button" class="btn btn-primary" @click="participate">
              Participar
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
      userStore: useUserStore(),
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
      }));
    },
    isLoggedUser() {
      return this.getStatus();
    },
  },
  methods: {
    getStatus() {
      if (this.userStore.getToken != null) return false;
      return true;
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
    openModal(post) {
      console.log("Abrindo modal para o post:", post);
      this.selectedPost = post;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    participate() {
      console.log("Participar");
    },
  },
  async created() {
    await this.fetchPosts();
  },
};
</script>
<style></style>
