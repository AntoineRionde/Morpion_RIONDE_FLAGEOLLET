<script>
import api from "../api";

export default {
  methods: {
    createGame() {
      api.post("api/games").then((response) => {
        this.$router.push("/game/:" + response.data.id);
      });
    },
  },
};

</script>

<template>
  <div>
    <h1>Page d'accueil</h1>
    <router-link to="/profil">Mon profil</router-link><br>
    <router-link to="/games">nouvelle Partie</router-link><br>
    <router-link to="/join">Rejoindre une partie</router-link><br>
  </div>
</template>

<style scoped>
</style>
