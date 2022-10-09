<template>
  <v-app>
    <v-navigation-drawer :style="'border: solid grey 1px;'" location="left" rail expand-on-hover>
      <v-list>
        <v-list-group :value="GameMode.Tile">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-account-circle" :title="GameMode.Tile"></v-list-item>
          </template>
          <v-list nav density="compact" :lines="false" class="pa-0" mandatory>
            <v-list-item :value="AlphabetType.Katakana" :title="AlphabetType.Katakana"
              @click="startGame()" />
            <v-list-item :value="AlphabetType.Hiragana" :title="AlphabetType.Hiragana"
              @click="startGame()" />
            <v-list-item :value="AlphabetType.Both" :title="AlphabetType.Both"
              @click="startGame()" />
          </v-list>
        </v-list-group>
        <v-list-group :value="GameMode.Keyboard">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-account-circle" :title="GameMode.Keyboard"></v-list-item>
          </template>
          <v-list nav density="compact" :lines="false" class="pa-0" mandatory>
            <v-list-item :title="AlphabetType.Katakana" :value="AlphabetType.Katakana"
              @click="startGame()" />
            <v-list-item :title="AlphabetType.Hiragana" :value="AlphabetType.Hiragana"
              @click="startGame()" />
            <v-list-item :title="AlphabetType.Both" :value="AlphabetType.Both"
              @click="startGame()" />
          </v-list>
        </v-list-group>
      </v-list>
      <v-col :style="'border: solid grey 1px;'" cols="1.5">
        <p>Versions : {{ selectedAlphabetType }}</p>
        <p>Types : {{ selectedGameMode }}</p>
    </v-col>
    </v-navigation-drawer>
    <v-main class="fill-height">
      <GameBoard v-if="gameInitied" :init-game="gameInitied" :alphabet-type="alphabetType" :game-mode="gameMode">
      </GameBoard>
    </v-main>
  </v-app>
</template>

<script lang="ts">

import { defineComponent, Ref, ref } from 'vue';
import GameBoard from './components/GameBoard.vue';
import { AlphabetType } from './models/AlphabetType';
import { GameMode } from './models/GameMode';

export default defineComponent({
  name: 'App',
  components: {
    GameBoard
  },
  setup() {
    const gameInitied: Ref<boolean> = ref(false);
    const selectedAlphabetType: Ref<AlphabetType[]> = ref([]);
    const selectedGameMode: Ref<GameMode[]> = ref([]);
    const alphabetType = ref("");
    const gameMode = ref("");

    const startGame = () => {
      console.log("Game started !");
      gameInitied.value = true;
      alphabetType.value = selectedAlphabetType?.value[0];
      gameMode.value = selectedGameMode?.value[0];
    }

    return {
      AlphabetType,
      alphabetType,
      gameMode,
      GameMode,
      gameInitied,
      selectedAlphabetType,
      selectedGameMode,
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
