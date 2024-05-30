<template>
    <div>
        <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <card type="tasks">
            <template slot="header">
              <h6 class="title d-inline">
                Create New Post
              </h6>
            </template>
            <div class="card-body">
              <form @submit.prevent="createPost">
                <div class="form-group">
                  <label for="title">Title:</label>
                  <input type="text" class="form-control" id="title" v-model="title" required>
                </div>
                <div class="form-group">
                  <label for="content">Content:</label>
                  <textarea class="form-control" id="content" v-model="content" required></textarea>
                </div>
                <div class="form-group">
                  <label for="image">Image:</label>
                  <input type="file" class="form-control" id="image" ref="imageInput" @change="onImageChange" style="display: none;">
                  <button type="button" class="btn btn-secondary" @click="triggerImageUpload">Add Image</button>
                  <span v-if="imageName">{{ imageName }}</span>
                </div>
                <br>
                <button type="submit" class="btn btn-primary">Create Post</button>
              </form>
            </div>
          </card>
        </div>
      </div>
    </div>
      <div class="row">
        <div class="col-lg-12">
          <card type="tasks" style="height: auto;">
            <template slot="header">
              <h6 class="title d-inline">
                Posts
              </h6>
            </template>
            <PostList></PostList>
          </card>
        </div>
    </div>
  
    </div>
  </template>
  <script>

  import PostList from "./Dashboard/PostList.vue";

  
  export default {
    components: {
      PostList,
    }
  };
  </script>
  
  <style>
  </style>
  