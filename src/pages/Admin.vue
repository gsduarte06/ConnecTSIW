<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center mt-5">
        <h1 class="mb-4">Admin Dashboard</h1>
        <div class="buttons">
          <router-link to="admininfo" class="button-link">Admin Info</router-link>
          <router-link to="adminpost" class="button-link">Admin Post</router-link>
        </div>
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

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.button-link {
  display: inline-block;
  padding: 15px 30px;
  background: linear-gradient(to right, #3498db, #2c3e50);
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 30px;
  margin: 10px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.button-link:hover {
  background: linear-gradient(to right, #2c3e50, #3498db);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.button-link:active {
  background: linear-gradient(to right, #2c3e50, #3498db);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
