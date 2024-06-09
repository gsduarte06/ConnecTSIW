<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow-sm">
          <div
            class="card-header bg-primary text-white d-flex justify-content-between align-items-center"
          >
            <h6 class="title d-inline">Create New Post</h6>
            <router-link to="/admin" class="btn btn-sm">
              <i class="fas fa-arrow-left"></i> Return to Admin
            </router-link>
          </div>
          <div class="card-body">
            <form @submit.prevent="createPost" class="create-post-form">
              <div class="form-group">
                <label for="content">Content:</label>
                <textarea
                  class="form-control"
                  id="content"
                  v-model="content"
                  required
                ></textarea>
              </div>
              <div class="form-group">
                <label for="date">Begin Date:</label>
                <input
                  type="date"
                  class="form-control"
                  id="beginDate"
                  v-model="beginDate"
                  required
                />

                <label for="date">End Date:</label>
                <input type="date" class="form-control" id="endDate" v-model="endDate" />
              </div>

              <div class="form-group">
                <label for="district">District</label>
                <select id="district" class="form-control" v-model="selectedDistrict">
                  <option value="" disabled selected>Select a district</option>
                  <option
                    v-for="district in districts"
                    :key="district.id_district"
                    :value="district.id_district"
                    required
                  >
                    {{ district.district }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="district">Type of post</label>
                <select id="district" class="form-control" v-model="selectedType">
                  <option value="" disabled selected>Select a type of post</option>
                  <option
                    v-for="type in type_post"
                    :key="type.id_type_post"
                    :value="type.id_type_post"
                    required
                  >
                    {{ type.type_post_desc }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="image">Image:</label>
                <input
                  type="file"
                  class="form-control-file"
                  id="image"
                  ref="imageInput"
                  @change="onImageChange"
                />
                <button
                  type="button"
                  class="btn btn-secondary mt-2"
                  @click="triggerImageUpload"
                >
                  Add Image
                </button>
                <span v-if="imageName">{{ imageName }}</span>
              </div>
              <img class="avatar" :src="imagePresent" alt="..." v-if="imagePresent" />
              <br />
              <button type="submit" class="btn btn-primary">Create Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-lg-12">
        <div class="card shadow-sm">
          <div
            class="card-header bg-primary text-white d-flex justify-content-between align-items-center"
          >
            <h6 class="title d-inline">Posts</h6>
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
import PostList from "./PostListAdmin.vue";
import * as api from "../api/api";
import { useUserStore } from "../store/user";
import { usePostsStore } from "../store/posts";
export default {
  components: {
    PostList,
  },
  data() {
    return {
      content: "",
      beginDate: "",
      endDate: "",
      imageName: "",
      selectedDistrict: "",
      selectedType: "",
      imagePresent: "",
      image: null,
      districts: null,
      type_post: null,
      posts: [],
      userStore: useUserStore(),
      postsStore: usePostsStore(),
    };
  },
  async mounted() {
    this.districts = await api.get(`districts`, this.token);
    this.type_post = await api.get(`type_posts`, this.userStore.token);
  },
  methods: {
    async createPost() {
      const convertDate = (date) => date.split("/").reverse().join("/");
      console.log(convertDate(this.beginDate));
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("content", this.content);
      formData.append("idType", this.selectedType);
      formData.append("district", this.selectedDistrict);
      formData.append("beginDate", convertDate(this.beginDate));
      if (this.endDate != "") formData.append("endDate", convertDate(this.endDate));
      console.log(...formData);
      await this.postsStore.createPost(formData, this.userStore.token);

      // Reset form fields
      this.content = "";
      this.beginDate = "";
      this.endDate = "";
      this.selectedDistrict = "";
      this.selectedType = "";
      this.imagePresent = null;
      this.imageName = "";
    },
    onImageChange(event) {
      console.log(event.target.files);
      const file = event.target.files[0]; // Get the selected file
      if (file) {
        const reader = new FileReader(); // Create a FileReader object
        reader.onload = () => {
          this.imagePresent = reader.result; // Set the avatar source to the selected image
        };
        reader.readAsDataURL(file); // Read the selected file as a data URL

        this.image = file;
      }
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
.create-post-form .form-group {
  margin-bottom: 20px;
}

.create-post-form label {
  font-weight: bold;
}

.create-post-form .form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #f8f9fa;
}

.create-post-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-post-form button:hover {
  background-color: #0056b3;
}

.create-post-form select {
  background-color: #343a40;
  color: #f8f9fa;
  border: 1px solid #343a40;
  border-radius: 5px;
  padding: 10px;
}

.create-post-form select option:hover {
  background-color: #495057;
}
</style>
