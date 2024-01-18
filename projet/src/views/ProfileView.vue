<template>
  <div class="profile-view">
    <div class="form-container">
      <form @submit.prevent="ModifProfil" class="profile-form">
        <h1>Modifier son profil</h1>
        <label for="name">Nom</label>
        <input type="text" id="name" name="name" v-model="user.name" />
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="user.email" />
        <div class="buttons-container">
          <router-link to="/">
            <button type="submit" class="save-button">Sauvegarder</button>
          </router-link>
          <router-link to="/" class="back-button">Revenir à l'accueil</router-link>
        </div>
      </form>
    </div>
  </div>
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
      next(vm => {
        vm.user.name = response.data.name;
        vm.user.email = response.data.email;
      });
    });
  },
  methods: {
    ModifProfil() {
      axiosInstance
          .put(`/api/profile`, this.user)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
};
</script>

<style scoped>
.profile-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.form-container {
  border: 2px solid #007BFF;
  border-radius: 10px;
  overflow: hidden;
}

.profile-form {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

label {
  margin-top: 10px;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.buttons-container {
  display: flex;
  flex-direction: column;
}

.save-button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s ease-in-out;
}

.save-button:hover {
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
  text-align: center;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.back-button:hover {
  background-color: #007BFF;
  color: #fff;
}
</style>
