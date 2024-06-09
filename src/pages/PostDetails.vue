<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <card type="tasks" style="height: auto">
          <template slot="header">
            <h6 class="title d-inline">Post Detail</h6>
          </template>
          <div class="card-body">
            <div class="mb-8">
              <p class="title mb-0">{{ post.content }}</p>
              <p class="text-muted">{{ post.date_post }}</p>
            </div>
            <div class="text-center mb-3">
              <img
                :src="post.image"
                alt="Image"
                style="
                  max-width: 450px;
                  max-height: 300px;
                  display: block;
                  margin: 0 auto;
                "
              />
            </div>
            <div v-if="comments.length > 0">
              <h6>Comentários:</h6>
              <div v-for="comment in comments" :key="comment.id_comment" class="comment">
                <p class="comment-content">
                  <strong>{{ getUserName(comment.id_user) }}:</strong>
                  {{ comment.content }}
                </p>
                <div>
                  <span class="like-icon" @click="addLike(comment.id_comment)">
                    ❤️ <span class="like-count">{{ comment.likes }}</span>
                  </span>
                  <span
                    class="like-icon"
                    @click="deleteComment(comment.id_comment)"
                    v-if="userStore.userId == 2"
                  >
                    🗑️
                  </span>
                </div>
              </div>
            </div>
            <div class="text-center mb-3">
              <textarea
                class="form-control"
                v-model="createCommentContent"
                rows="3"
                placeholder="Write a comment"
                :disabled="isLoggedUser"
              ></textarea>
            </div>
            <div class="text-center" v-if="createCommentContent">
              <button class="btn btn-primary" @click="submitComment">
                Submit Comment
              </button>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { usePostsStore } from "../store/posts";
import { useUserStore } from "../store/user";
import * as api from "../api/api";
export default {
  data() {
    return {
      post: {},
      comments: [],
      createCommentContent: "",
      users: {},
      postsStore: usePostsStore(),
      userStore: useUserStore(),
    };
  },
  computed: {
    isLoggedUser() {
      return this.getStatus();
    },
  },
  async created() {
    this.update();
    console.log(this.comments);
  },
  methods: {
    getStatus() {
      if (this.userStore.getToken != null) return false;
      return true;
    },
    async update() {
      const postId = this.$route.params.id;

      await this.postsStore.fetchPosts();
      this.post = this.getPostById(postId, this.postsStore.posts);
      await this.postsStore.fetchCommentbyPost(postId);
      this.comments = this.postsStore.comments;
      for (let comment of this.comments) {
        await this.userStore.fetchUserById(comment.id_user);
        this.$set(
          this.users,
          comment.id_user,
          this.userStore.getUserById(comment.id_user)
        );
      }
    },
    getPostById(id, posts) {
      return posts.find((post) => post.id_post == id);
    },
    getUserName(userId) {
      return this.users[userId]?.username || this.userStore.user.username;
    },
    async addLike(id_comment) {
      const LikeData = {
        idUser: this.userStore.userId,
        idComment: id_comment,
      };
      try {
        await api.post(`comments/${id_comment}/likes`, LikeData, this.userStore.token);
      } catch (error) {
        if ((error.msg = "like is already in the database")) {
          await api.del(`comments/${id_comment}/likes`, this.userStore.token, LikeData);
        }
      }
      this.update();
    },
    async deleteComment(id_comment) {
      try {
        await api.del(`comments/${id_comment}`, this.userStore.token);
        this.update();
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    },
    async submitComment() {
      if (this.createCommentContent != "") {
        const postId = this.$route.params.id;
        const commentData = {
          idUser: this.userStore.userId,
          content: this.createCommentContent,
        };
        try {
          await this.postsStore.createComment(postId, commentData, this.userStore.token);
          this.comments = this.postsStore.comments;
          this.update();
          this.createCommentContent = "";
        } catch (error) {
          console.error("Error submitting comment:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-content {
  margin-right: 10px;
}

.like-icon {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.like-icon:hover {
  opacity: 1;
}
</style>
