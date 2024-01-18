<template>
  <button> <a href="/">Revenir à l'accueil</a></button>
  <form>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" v-model="user.name" />
    <label for="email">Email</label>
    <input type="email" id="email" name="email" v-model="user.email" />
    <button type="submit" @click="ModifProfil()">Enregistrer</button>
  </form>
</template>

<script>
import axiosInstance from "../api/index.js";

export default {
  name: "ProfileView",
  data() {
    return {
      user: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    axiosInstance.get(`/api/profile`).then(response => {
      console.log(response.data.name);
      next (vm => {
        vm.user.name = response.data.name;
        vm.user.email  = response.data.email;
      });
    });
  },
  methods: {
    ModifProfil() {
      axiosInstance
        .put(`/api/profile`, this.user)
        .catch(error => {
          console.log(error);
        })
        .then(response => {
          console.log(response);
        });
    }
  },

};
</script>

<style scoped>

</style>