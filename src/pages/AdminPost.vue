<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h6 class="title d-inline">
              Create New Post
            </h6>
            <router-link to="/admin" class="btn  btn-sm">
              <i class="fas fa-arrow-left"></i> Return to Admin
            </router-link>
          </div>
          <div class="card-body">
            <form @submit.prevent="createPost" class="create-post-form">
              <div class="form-group">
                <label for="content">Content:</label>
                <textarea class="form-control" id="content" v-model="content" required></textarea>
              </div>
              <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" class="form-control" id="date" v-model="date" required>
              </div>
              <div class="form-group">
                <label for="image">Image:</label>
                <input type="file" class="form-control-file" id="image" ref="imageInput" @change="onImageChange">
                <button type="button" class="btn btn-secondary mt-2" @click="triggerImageUpload">Add Image</button>
                <span v-if="imageName">{{ imageName }}</span>
              </div>
              <br>
              <button type="submit" class="btn btn-primary">Create Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-lg-12">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h6 class="title d-inline">
              Posts
            </h6>
          </div>
          <div class="card-body">
            <PostList></PostList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "./Dashboard/PostListAdmin.vue";

export default {
  components: {
    PostList,
  },
  data() {
    return {
      title: '',
      content: '',
      date: '',
      imageName: '',
      posts: [
        { id: 1, title: 'Post 1', content: 'Content of post 1', date: '2024-06-02', participants: 10 },
        { id: 2, title: 'Post 2', content: 'Content of post 2', date: '2024-06-03', participants: 5 },
        // Additional post data...
      ],
    };
  },
  methods: {
    createPost() {
      // Logic to create a new post
      const newPost = {
        title: this.title,
        content: this.content,
        date: this.date,
        participants: 0, // Initially no participants
        // Additional post properties...
      };
      this.posts.push(newPost);
      // Reset form fields
      this.title = '';
      this.content = '';
      this.date = '';
      this.imageName = '';
    },
    onImageChange(event) {
      // Logic to handle image change
    },
    triggerImageUpload() {
      // Logic to trigger image upload
    },
  },
};
</script>

<style scoped>
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

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 16px;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.form-control {
  border-color: #ced4da;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn {
  border-radius: 4px;
}
</style>
