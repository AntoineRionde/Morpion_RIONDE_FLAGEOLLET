<template>
  <div>
    <h1>Page d'accueil</h1>
    <router-link to="/profile">Mon profil</router-link><br>
    <router-link to="/game" v-on:click="createGame()">nouvelle Partie</router-link><br>
    <router-link to="/join">Rejoindre une partie</router-link><br>
  </div>
</template>

<script>
import axiosInstance from "../api";
export default{
  name: "HomeView",
  data() {
    return {
    };
  },
  methods: {
    createGame() {
      axiosInstance.post(`/api/games`).then(response => {
        let id = response.data.id;
        this.$router.push({ path: `/games/${id}` });
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
</style>
