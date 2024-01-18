<template>
  <label for="code">Code de la partie : </label>
  <input type="text" name="code" required v-model="code"/>
  <button type="submit" @click="joinGame()">Rejoindre</button>
</template>

<script>
import axiosInstance from "../api";
export default {
  name: "JoinView",
  data() {
    return {
      code: ""
    };
  },
  methods: {
    joinGame() {
      axiosInstance.patch(`/api/games/${this.code}/join`).then(response => {
        console.log(response.data);
         let id = response.data.id;
         this.$router.push({ path: `/games/${id}` });
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>

</style>