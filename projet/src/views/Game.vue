<template>
  <textarea v-model="game.owner.name">Nom du joueur 1</textarea>
  <textarea v-if="opponent" v-model="opponent.name">J2 : </textarea>
  <textarea v-model="game.code">Code de la partie</textarea>
</template>

<script>
import axiosInstance from "../api";
export default {
  name: "GameVue",
  data() {
    return {
      game: {owner: {}}
    };
  },
  computed: {
    opponent() {
      if (this.game.opponent) {
        // afficher la grille de jeu
        return this.game.opponent;
      } else {
        return "En attente d'un adversaire";
      }
    }
  },
  methods: {
    async waitForOpponentMove() {
      // Si la partie est terminée, il n'y a pas de raison de rafraîchir
      if (this.game.state === 2) {
        return;
      }
      // recupérer le paramètre id de l'URL
      let params = this.$route.params;
      let id = parseInt(params.id);
      let response = await axiosInstance.get(`/api/game/${id}`, {
        params: {
          since: this.game.last_time_updated
        }
      });

      this.game = response.data;

      // Si la partie n'est pas encore terminée, attendez un nouveau tour
      if (this.game.state !== 2) {
        await this.waitForOpponentMove();
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    axiosInstance.get(`/api/games/${to.params.id}`).then(response => {
      console.log(response.data);
      next(vm => {
        vm.game.owner.name = response.data.owner.name;
        vm.game.code = response.data.code;
        vm.game.opponent = response.data.opponent;
        vm.game.state = response.data.state;
        vm.game.last_time_updated = response.data.last_time_updated;
      });
    });

  }

}
</script>

<style scoped>

</style>