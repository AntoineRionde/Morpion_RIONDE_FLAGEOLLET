<template>
  <div class="join-view">
    <div class="form-container">
      <h1>Rejoindre une partie</h1>
      <label for="code">Code de la partie :</label>
      <input type="text" name="code" required v-model="code" />
      <button class="join-button" @click="joinGame">Rejoindre</button>
    </div>
    <button class="back-button"><router-link to="/">Revenir à l'accueil</router-link></button>
  </div>
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
      axiosInstance.patch(`/api/games/${this.code}/join`)
          .then(response => {
            console.log(response.data);
            let id = response.data.id;
            this.$router.push({ path: `/games/${id}` });
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>
.join-view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.form-container {
  border: 2px solid #007BFF;
  border-radius: 10px;
  overflow: hidden;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 18px;
  margin-bottom: 10px;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.join-button {
  padding: 12px;
  font-size: 18px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.join-button:hover {
  background-color: #0056b3;
}

.back-button {
  padding: 10px;
  background-color: #fff;
  color: #007BFF;
  border: 1px solid #007BFF;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.back-button:hover {
  background-color: #007BFF;
  color: #fff;
}
</style>
