<template>
  <v-app>
    <v-navigation-drawer :style="'border: solid grey 1px;'" location="left" rail expand-on-hover>
      <v-list-group :value="GameMode.Tile">
        <v-list nav>
          <v-list-item :value="AlphabetType.Katakana" @click="startGame(GameMode.Tile, AlphabetType.Katakana)"/>
          <v-list-item :value="AlphabetType.Hiragana" @click="startGame(GameMode.Tile, AlphabetType.Hiragana)"/>
          <v-list-item :value="AlphabetType.Both" @click="startGame(GameMode.Tile, AlphabetType.Both)"/>
        </v-list>
      </v-list-group>
      <v-list-group :value="GameMode.Keyboard">
        <v-list nav>
          <v-list-item :title="AlphabetType.Katakana" :value="AlphabetType.Katakana" @click="startGame(GameMode.Keyboard, AlphabetType.Katakana)"/>
          <v-list-item :title="AlphabetType.Hiragana" :value="AlphabetType.Hiragana" @click="startGame(GameMode.Keyboard, AlphabetType.Hiragana)"/>
          <v-list-item :title="AlphabetType.Both" :value="AlphabetType.Both" @click="startGame(GameMode.Keyboard, AlphabetType.Both)"/>
        </v-list>
      </v-list-group>
    </v-navigation-drawer>
    <v-main class="fill-height">
      <GameBoard v-if="gameInitied" :init-game="gameInitied" :alphabet-type="alphabetType" :game-mode="gameMode"></GameBoard>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  
import { defineComponent, Ref, ref } from 'vue'
import { AlphabetType } from './models/AlphabetType';
import GameBoard from './components/GameBoard.vue';
import { GameMode } from './models/GameMode';

export default defineComponent({
  name: 'App',
  components: {
    GameBoard
},
  setup() {
    const alphabetType: Ref<AlphabetType> = ref(AlphabetType.Katakana);
    const gameMode: Ref<GameMode> = ref(GameMode.Tile);
    const gameInitied = ref(true);

    const startGame = (mode: GameMode, type: AlphabetType) => {
      gameInitied.value = true;
      gameMode.value = mode;
      alphabetType.value = type;
    }

    return {
      AlphabetType,
      alphabetType,
      GameMode,
      gameMode,
      gameInitied,
      startGame
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
