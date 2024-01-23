<template>
  <header>
    <textarea v-model="game.owner.name"></textarea>
    <textarea v-if="opponent" v-model="opponent.name"></textarea>
    <textarea v-model="game.code"></textarea>
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

  <div class="game-state">
    <div v-if="game.state === 0">En attente d'un adversaire</div>
    <div v-if="game.state === 1">En cours</div>
    <div v-if="game.state === 2">Terminée, gagnant : <input v-model="game.winner.name" /> </div>
  </div>

  <footer>
    <button> <a href="/">Revenir à l'accueil</a></button>
  </footer>

</template>

<script>
import axiosInstance from "../api";
import {isNull} from "eslint-plugin-vue/lib/utils/ts-utils/typescript.js";
export default {
  name: "GameVue",
  data() {
    return {
      game: {owner: {}, winner: {}},
      symbols: {
        0: "X",
        1: "O"
      }
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
    makeGrid(userSymbol, row, col) {
      switch (`${row},${col}`) {
        case '1,1':
          document.querySelector("section:nth-child(1)").innerHTML = this.symbols[userSymbol];
          break;
        case '1,2':
          document.querySelector("section:nth-child(2)").innerHTML = this.symbols[userSymbol];
          break;
        case '1,3':
          document.querySelector("section:nth-child(3)").innerHTML = this.symbols[userSymbol];
          break;
        case '2,1':
          document.querySelector("section:nth-child(4)").innerHTML = this.symbols[userSymbol];
          break;
        case '2,2':
          document.querySelector("section:nth-child(5)").innerHTML = this.symbols[userSymbol];
          break;
        case '2,3':
          document.querySelector("section:nth-child(6)").innerHTML = this.symbols[userSymbol];
          break;
        case '3,1':
          document.querySelector("section:nth-child(7)").innerHTML = this.symbols[userSymbol];
          break;
        case '3,2':
          document.querySelector("section:nth-child(8)").innerHTML = this.symbols[userSymbol];
          break;
        case '3,3':
          document.querySelector("section:nth-child(9)").innerHTML = this.symbols[userSymbol];
          break;
      }
    },
    async waitForOpponentMove() {
      if (this.game.state === 2) {
        return;
      }
      let params = this.$route.params;
      let id = params.id;
      let response = await axiosInstance.get(`/api/games/${id}`, {
        params: {
          since: this.game.last_time_updated
        }
      });
      this.game = response.data;
      console.log(this.game);
      if (this.game.state !== 2) {
        setTimeout(() => this.waitForOpponentMove(), 5000);
      }
      else if (this.game.state === 2) {
        alert("La partie est terminée");
      }
      this.updateView(this.game);
    },
    updateView(game) {
      let view =  [game.r1c1, game.r1c2, game.r1c3, game.r2c1, game.r2c2, game.r2c3, game.r3c1, game.r3c2, game.r3c3];
      let col = 0;
      let row = 0;
      for (let i = 0; i < view.length; i++) {
        if (view[i] === 1) {
          let userSymbol = 1;
          if(i<3){
            row = 1;
            col = i+1;
          } else if (i<6){
            row = 2;
            col = i-2;
          } else if (i<9){
            row = 3;
            col = i-5;
          }
          this.makeGrid(userSymbol,row,col);
        } else if (view[i] === 2) {
          let userSymbol = 0;
          if(i<3){
            row = 1;
            col = i+1;
          } else if (i<6){
            row = 2;
            col = i-2;
          } else if (i<9){
            row = 3;
            col = i-5;
          }
          this.makeGrid(userSymbol,row,col);
        }
      }
    },
    play(row, col) {
      let params = this.$route.params;
      let id = params.id;
      axiosInstance.patch(`/api/games/${id}/play/${row}/${col}`).then(response => {
        this.game = response.data;
        if (this.game.opponent.id === this.game.next_player_id) {
          this.makeGrid(1, row, col);
        } else if (this.game.owner.id === this.game.next_player_id) {
          this.makeGrid(0, row, col);
        }
      }).catch(error => {
        console.log(error.response.data.errors);
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    axiosInstance.get(`/api/games/${to.params.id}`).then(response => {
      next(vm => {
        vm.game=response.data;
        vm.waitForOpponentMove();
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200px;
}

section:nth-child(1), section:nth-child(2), section:nth-child(4), section:nth-child(5), section:nth-child(7), section:nth-child(8) {
  border-right:  2px solid #ccc;
}

section:nth-child(1), section:nth-child(2), section:nth-child(3), section:nth-child(4), section:nth-child(5), section:nth-child(6) {
  border-bottom:  2px solid #ccc;
}

</style>