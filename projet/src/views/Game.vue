<template>
  <header>
    <textarea v-model="game.owner.name">Nom du joueur 1</textarea>
    <textarea v-if="opponent" v-model="opponent.name">J2 : </textarea>
    <textarea v-model="game.code">Code de la partie</textarea>
  </header>

    <div class="morpion">
      <section @click="play(1,1)"></section>
      <section @click="play(1,2)"></section>
      <section @click="play(1,3)"></section>
      <section @click="play(2,1)"></section>
      <section @click="play(2,2)"></section>
      <section @click="play(2,3)"></section>
      <section @click="play(3,1)"></section>
      <section @click="play(3,2)"></section>
      <section @click="play(3,3)"></section>
    </div>

   <footer>
      <button> <a href="/">Revenir à l'accueil</a></button>
  </footer>

</template>

<script>
import axiosInstance from "../api";
export default {
  name: "GameVue",
  data() {
    return {
      game: {owner: {}},
      symbols: {
        0: "X",
        1: "O"}
    };
  },
  computed: {
    opponent() {
      if (this.game.opponent) {
        return this.game.opponent;
      } else {
        return "En attente d'un adversaire";
      }
    }
  },
  methods: {
    async waitForOpponentMove(isFirstPlayerPlaying, row, col) {
      if (this.game.state === 2) {
        return;
      }
      let params = this.$route.params;
      let id = parseInt(params.id);

      let response = await axiosInstance.get(`/api/game/${id}`, {
        params: {
          since: this.game.last_time_updated
        }
      });

     if (isFirstPlayerPlaying) {


     }

      this.game = response.data;
      if (this.game.state !== 2) {
        setTimeout (await this.waitForOpponentMove, 5000);
      }
      else if (this.game.state === 2) {
        alert("La partie est terminée");
      }
    },
    play(row, col) {
      let params = this.$route.params;
      let id = params.id;
      axiosInstance.patch(`/api/games/${id}/play/${row}/${col}`).then(response => {


        console.log('okay, lets go!');
      }).catch(error => {
        console.log("La cellule cible a déjà été jouée");
        console.log(error.response.data.errors);
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    axiosInstance.get(`/api/games/${to.params.id}`).then(response => {
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
header {
  background-color: #ccc;
}

footer {
  background-color: #ddd;
}

.morpion {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 5px;
  margin: 5% 20% 5% 20%;
}
section {
  height: 200px;
  width: 100%;
}

section:nth-child(1), section:nth-child(2), section:nth-child(4), section:nth-child(5), section:nth-child(7), section:nth-child(8) {
  border-right:  2px solid #ccc;
}

section:nth-child(1), section:nth-child(2), section:nth-child(3), section:nth-child(4), section:nth-child(5), section:nth-child(6) {
  border-bottom:  2px solid #ccc;
}

</style>