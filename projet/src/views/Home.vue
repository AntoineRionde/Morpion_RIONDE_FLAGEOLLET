<template>
  <body>
    <div class="home-view">
      <h1 class="page-title">une partie de morpion ? </h1>
      <router-link to="/profile" class="nav-link">Mon Profil</router-link>
      <router-link to="/game" @click="createGame" class="btn-primary">Nouvelle Partie</router-link>
      <router-link to="/join" class="nav-link">Rejoindre une Partie</router-link>
    </div>
  </body>
</template>

<script>
import axiosInstance from "../api";

export default {
  name: "HomeView",
  data() {
    return {};
  },
  methods: {
    createGame() {
      axiosInstance.post(`/api/games`)
          .then(response => {
            let id = response.data.id;
            this.$router.push({ path: `/games/${id}` });
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>

<style scoped>
body{
  font-family: sans-serif;
  background-color: #e9ecef;
}
.home-view {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.page-title {
  font-size: 28px;
  margin-bottom: 20px;
  color: #007BFF;
}

.nav-link {
  display: block;
  font-size: 18px;
  margin: 15px 0;
  text-decoration: none;
  color: #007BFF;
  transition: color 0.3s ease-in-out;
}

.btn-primary {
  display: inline-block;
  padding: 10px 20px;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  background-color: #007BFF;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
