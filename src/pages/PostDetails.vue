<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <card type="tasks" style="height: auto;">
          <template slot="header">
            <h6 class="title d-inline">
              Post Detail
            </h6>
          </template>
          <div class="card-body">
            <div class="mb-8">
              <p class="title mb-0">{{ post.content }}</p>
              <p class="text-muted">{{ post.date_post }}</p>
            </div>
            <div class="text-center mb-3">
              <img :src="post.imagem" alt="Image" style="max-width: 450px; max-height: 300px; display: block; margin: 0 auto;">
            </div>
            <div v-if="comments.length > 0">
              <h6>Comentários:</h6>
              <div v-for="comment in comments" :key="comment.id_comment">
                <p><strong>{{ getUserName(comment.id_user) }}:</strong> {{ comment.content }}</p>
              </div>
            </div>
            <div class="text-center mb-3">
              <textarea class="form-control" v-model="createCommentContent" rows="3" placeholder="Write a comment"></textarea>
            </div>
            <div class="text-center">
              <button class="btn btn-primary" @click="submitComment">Submit Comment</button>
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

export default {
  data() {
    return {
      post: {},
      comments: [],
      createCommentContent: '',
      users: {},
    };
  },
  async created() {
    const postId = this.$route.params.id;
    const postsStore = usePostsStore();
    const userStore = useUserStore();

    await postsStore.fetchPosts();
    this.post = this.getPostById(postId, postsStore.posts);
    await postsStore.fetchCommentbyPost(postId);
    this.comments = postsStore.comments;

    for (let comment of this.comments) {
      await userStore.fetchUserById(comment.id_user); 
      this.$set(this.users, comment.id_user, userStore.getUserById(comment.id_user));
    }
  },
  methods: {
    getPostById(id, posts) {
      return posts.find(post => post.id_post == id);
    },
    getUserName(userId) {
      return this.users[userId]?.username || "User";
    },
    async submitComment() {
      const postId = this.$route.params.id;
      const userStore = useUserStore();
      const postsStore = usePostsStore();
      const commentData = {
        idUser: userStore.userId,
        content: this.createCommentContent,
      };
      try {
        await postsStore.createComment(postId, commentData, userStore.token);
        await postsStore.fetchCommentbyPost(postId); 
        this.comments = postsStore.comments;
        this.createCommentContent = ''; 
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  }
};
</script>
<style>

</style>
