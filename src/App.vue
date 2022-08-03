<template>
  <v-app>
    <v-main>
      <v-toolbar dense elevation="2">
        <v-toolbar-items>
          <v-btn-toggle mandatory multiple v-model="selectedAlphabet">
            <v-btn x-small v-for="alphabet in alphabetsMap" :value="alphabet.alphabet" :key="alphabet.name"> {{ alphabet.name }}</v-btn>
          </v-btn-toggle>
          <v-btn-toggle mandatory multiple v-model="selectedOptions">
            <v-btn x-small v-for="opt in optionsMap" :value="opt.type" :key="opt.type"> {{ opt.name }}</v-btn>
          </v-btn-toggle>
          <v-btn @click="getGuesses">Randomize</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-spacer>Symbole à trouver</v-spacer>
        <v-row :align="center">
          <v-col>
            <kanaItem v-if="solution" :name="solution.roumaji" :symbol="solution.kana"></kanaItem>
          </v-col>
        </v-row>
        <v-spacer>Choix</v-spacer>
        <v-row :align="center">
          <v-col v-for="guess in guesses" :key="guess.roumaji">
            <kanaItem :name="guess.roumaji" :symbol="guess.kana"></kanaItem>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue'
//import HelloWorld from './components/HelloWorld.vue'
import kanaItem from './components/kana-item.vue'
import katakana from './resource/js/katakana.json'
import hiragana from './resource/js/hiragana.json'

export default {
  name: 'App',
  components: {
    kanaItem
  },
  setup() {

    const optionsMap = [
      { name: 'Handakuten', type: 'handakuon' },
      { name: 'Dakuten', type: 'dakuon' },
      { name: 'Gojūon', type: 'gojuuon' },
      { name: 'Yōon', type: 'youon' }
    ]
    const alphabetsMap = [
      { name: "Katakana", alphabet: require('./resource/js/katakana.json') },
      { name: "Hiragana", alphabet: require('./resource/js/hiragana.json') },
    ];

    const selectedAlphabet = ref();
    const selectedOptions = ref();

    let alphabet;
    const solution = ref();
    const guesses = ref();

    const getGuesses = () => {
      console.log("Get Guesses called");
      alphabet = setupAlphabet(selectedAlphabet.value, selectedOptions.value);
      console.log("Alphabet : " + alphabet)
      solution.value = getRandomItem(alphabet);
      console.log("Solution : " + solution.value);
      guesses.value = getRandomAnswers(alphabet, solution.value, 5);
      console.log("Guesses : " + guesses.value);
    }

    const setupAlphabet = (selectedAlphabet, selectedOptions) => {
      var retAlphabet = null;
      console.log(selectedAlphabet);
      retAlphabet = selectedAlphabet.flat();
      console.log(retAlphabet);
      return retAlphabet.filter(item => selectedOptions.includes(item.type));
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
      possibleAnswer--;
      for (let i = 0; i < possibleAnswer; i++) {
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

    onMounted(() => {
      console.log("OnMounted -- Init :");
      selectedAlphabet.value = [alphabetsMap[0].alphabet];
      console.log("Selected Alphabet : " + selectedAlphabet.value);
      selectedOptions.value = [optionsMap[0].type];
      console.log("Selected Options : " + selectedOptions.value);
      getGuesses();
    })

    return {
      optionsMap,
      alphabetsMap,
      selectedAlphabet,
      selectedOptions,
      setupAlphabet,
      getRandomAnswers,
      getRandomItem,
      randomIndex,
      katakana,
      hiragana,
      alphabet,
      solution,
      guesses,
      getGuesses
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
