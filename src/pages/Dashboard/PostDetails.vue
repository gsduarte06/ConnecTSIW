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
              <p class="title mb-0">{{ post.Conteudo_Publicacao }}</p>
              <p class="text-muted">{{ post.Data_Criado }}</p>
            </div>
            <div class="text-center mb-3">
              <img :src="post.Imagem" alt="Image" style="max-width: 450px; max-height: 300px; display: block; margin: 0 auto;">
            </div>
            <div v-if="post.Comment && post.Comment.length > 0">
              <h6>Comentários:</h6>
              <div v-for="comment in post.Comment" :key="comment.Id_Comment">
                <p><strong>{{ comment.Name }}:</strong> {{ comment.Conteudo_Comment }}</p>
              </div>
            </div>
            <div class="text-center mb-3">
              <textarea class="form-control" v-model="comment" rows="3" placeholder="Write a comment"></textarea>
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
import postData from '../Dashboard/postData.js';

export default {
  data() {
    return {
      post: {},
      comment: '',
      posts:[],
    };
  },
  created() {
    const postId = this.$route.params.id; 
    this.posts = postData;
    this.post = this.getPostById(postId); 
    console.log(this.post)
  },
  
  methods: {
    getPostById(id) {
      return this.posts.find(post => post.Id_Publicacao == id);
    },
    submitComment() {
      console.log('Comment submitted:', this.comment);
      this.comment = '';
    }
  }
};
</script>

<style>

</style>
