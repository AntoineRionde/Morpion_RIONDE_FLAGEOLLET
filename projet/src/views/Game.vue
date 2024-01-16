<script>

import api from "../api";
export default {
  data() {
    return {
      game: null,
      intervalId: null,
    };
  },
  methods: {
    beforeRouteEnter(to, from, next) {
      api.get("api/games/:" + to.params.id).then((response) => {
        next((vm) => {
          vm.game = response.data;
        }, 1000);
      });
    },
    waitForOpponentMove() {
      api.get("api/games/:" + this.game.id).then((response) => {
        this.game = response.data;
        if (this.game.state === 2) {
          this.intervalId = setTimeout(this.waitForOpponentMove, 1000);
        }
      });
    },
  },
};
</script>

<template>
  <div>
    <div v-if="game">
      <h1>{{ game.owner }} vs {{ game.opponent.name }}</h1>
      <p>Code de la partie : {{ game.code }}</p>
      <button v-if="!game.opponent" @click="waitForOpponent">En attente d'un adversaire</button>
    </div>
    <div v-else>
      <p>Chargement en cours...</p>
    </div>
  </div>
</template>
