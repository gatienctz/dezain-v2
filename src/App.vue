<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <v-toolbar dense elevation="2">
    <v-toolbar-items>
      <v-btn-toggle mandatory multiple v-model="selectedAlphabet">
        <v-btn v-for="alphabet in alphabetsMap" value="alphabet.type"> {{ alphabet.name }}</v-btn>
      </v-btn-toggle>
      <v-btn-toggle mandatory multiple v-model="selectedOptions">
        <v-btn v-for="opt in optionsMap" value="opt.type"> {{ opt.name }}</v-btn>
      </v-btn-toggle>
    </v-toolbar-items>
  </v-toolbar>
  <p> {{ selectedOptions }}</p>
  <p> {{ selectedAlphabet }}</p>
  <kanaItem name="kana.name" symbol="kana.kana" v-for="kana in katakana" :key="kana.name"></kanaItem>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import kanaItem from './components/kana-item.vue'
import katakana from './resource/js/katakana.json'
import hiragana from './resource/js/hiragana.json'

export default {
  name: 'App',
  vuetify,
  components: {
    HelloWorld,
    kanaItem
  },
  setup() {
    const KATAKANA = "Katakana";
    const HIRAGANA = "Hiragana";

    const optionsMap = [
      { name: 'Handakuten', type: 'handakuon' },
      { name: 'Dakuten', type: 'dakuon' },
      { name: 'Gojūon', type: 'gojuuon' },
      { name: 'Yōon', type: 'youon' }
    ]
    const alphabetsMap = [KATAKANA, HIRAGANA];

    const selectedAlphabet = ['Katakana'];
    const selectedOptions = ['Gojūon'];

    const setupAlphabet = (selectedAlphabet, selectedOptions) => {
      var retAlphabet = null;
      if (selectedAlphabet.length == 1) {
        if (KATAKANA === selectedAlphabet[0]) {
          retAlphabet = katakana;
        }
        else if (HIRAGANA === selectedAlphabet[0]) {
          retAlphabet = hiragana;
        }
      }
      else if (selectedAlphabet.length == 2) {
        retAlphabet = katakana.concat(hiragana);
      }
      return retAlphabet.filter(item => optionsMap.filter(opt => selectedOptions.includes(opt.name)).map(obj => obj.type).includes(item.type))
    }

    const randomIndex = (array) => {
      return Math.floor(Math.random() * array.length);
    }

    const getRandomItem = (array) => {
      return array[randomIndex(array)];
    }

    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    const getRandomAnswers = (array, solution, possibleAnswer = 3) => {
      const answers = [solution];
      possibleAnswer--;//Decrease nb of possible answer because the solution is part of it
      for (i = 0; i < possibleAnswer; i++) {
        var item;
        do {
          item = getRandomItem(array);
        }
        while (answers.includes(item))
        answers.push(item);
      }
      shuffleArray(answers);
      return answers;
    }

    return {
      options,
      getKataKanaByRoumaji,
      getHiraganaByRoumaji,
      selectedAlphabet
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
