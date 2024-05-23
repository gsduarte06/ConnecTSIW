<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center mt-5">
          <h1>Admin</h1>
          <!-- Add classes to router-links to style them like buttons -->
          <router-link to="/admin/admininfo" class="button-link">Admin Info</router-link>
          <router-link to="/admin/adminpost" class="button-link">Admin Post</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .container {
    margin-top: 50px;
  }
  
  /* Define button style for router links */
  .button-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    margin: 5px;
  }
  
  /* Hover effect */
  .button-link:hover {
    background-color: #0056b3;
  }
  
  /* Active (clicked) state */
  .button-link:active {
    background-color: #004080;
  }
  </style>
  