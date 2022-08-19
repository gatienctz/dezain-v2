<template>
  <v-app>
    <v-main>
      <!-- <v-toolbar dense elevation="2">
        <v-toolbar-items>
          <v-btn-toggle mandatory multiple v-model="selectedAlphabet">
            <v-btn x-small v-for="alphabet in alphabetsMap" :value="alphabet.alphabet" :key="alphabet.name"> {{
                alphabet.name
            }}</v-btn>
          </v-btn-toggle>
          <v-btn-toggle mandatory multiple v-model="selectedOptions">
            <v-btn x-small v-for="opt in optionsMap" :value="opt.type" :key="opt.type"> {{ opt.name }}</v-btn>
          </v-btn-toggle>
          <v-btn-toggle mandatory multiple v-model="selectedTypeGuess">
            <v-btn x-small v-for="t in typeGuessMap" :value="t.type" :key="t.type"> {{ t.name }}</v-btn>
          </v-btn-toggle>
          <v-btn @click="getGuesses">Randomize</v-btn>
        </v-toolbar-items>
      </v-toolbar> -->
      <v-container>
        <v-row>
          <v-col>
            <AlphabetOptionsTab :model="hiraganaModel" :versionOptions="versionOptions" :typeOptions="typeOptions"/>
          </v-col>
          <v-col>
            <AlphabetOptionsTab :model="katakanaModel" :versionOptions="versionOptions" :typeOptions="typeOptions"/>
          </v-col>
        </v-row>
      </v-container>
      <!--<v-container>
        <v-spacer>Symbole à trouver</v-spacer>
        <v-row :align="center">
          <v-col>
            <KanaItem v-if="solution" :isSymbol="solution.displayType" :item="solution"></KanaItem>
          </v-col>
        </v-row>
        <v-spacer>Choix</v-spacer>
        <v-row :align="center">
          <v-col v-for="guess in guesses" :key="guess.roumaji">
            <KanaItem v-if="solution" :item="guess" :isSymbol="!solution.displayType"></KanaItem>
          </v-col>
        </v-row>
      </v-container>-->
    </v-main>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue'
//import KanaItem from './components/KanaItem.vue'
import AlphabetOptionsTab from './components/AlphabetOptionsTab.vue'

export default {
  name: 'App',
  components: {
    //KanaItem,
    AlphabetOptionsTab
  },
  setup() {

    const versionOptions = {
      title: "Versions",
      options: [
        { name: 'Handakuten', type: 'handakuon' },
        { name: 'Dakuten', type: 'dakuon' },
        { name: 'Gojūon', type: 'gojuuon' },
        { name: 'Yōon', type: 'youon' }
      ]
    }

    const typeOptions = {
      title: "Types",
      options: [
        { name: "Symbole", type: 'kana' },
        { name: "Roumaji", type: 'roumaji' }
      ]
    }

    const katakanaModel = {
      name: "Katakana",
      selectedVersions: ref([]),
      selectedTypes: ref([]),
      json: require('./resource/js/katakana.json'),
      scoreboard: {
        rightAnswers: ref(0),
        wrongAnswers: ref(0)
      }
    };
    
    const hiraganaModel = {
      name: "Hiragana",
      selectedVersions: ref([]),
      selectedTypes: ref([]),
      json: require('./resource/js/hiragana.json'),
      scoreboard: {
        rightAnswers: ref(0),
        wrongAnswers: ref(0)
      }
    };

    //var isSymbol = true;


    //TODO Do Computed object for Total & pourcent for each entry of scoreboardModel 

    /*const verifyAnswer = (item) => {
      item.roumaji === solution.value.roumaji ? rightAnswer++ : wrongAnswer++;
    }*/
    /*
    const getGuesses = () => {

      alphabet = setupAlphabet(selectedAlphabet.value, selectedOptions.value);

      solution.value = getRandomItem(alphabet);

      guesses.value = getRandomAnswers(alphabet, solution.value, 5);

      isSymbol = isSymbolDisplay(selectedTypeGuess.value);

      solution.value.displayType = isSymbol;
    }

    const setupAlphabet = (selectedAlphabet, selectedOptions) => {
      var retAlphabet = null;
      retAlphabet = selectedAlphabet[randomIndex(selectedAlphabet)];
      return retAlphabet.filter(item => selectedOptions.includes(item.type));
    }*/

    const isSymbolDisplay = (types) => {
      return types[randomIndex(types)] === 'kana';
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
      //Get random answers
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
      //selectedAlphabet.value = [alphabetsMap[0].alphabet];
      //selectedOptions.value = [optionsMap[0].type];
      //selectedTypeGuess.value = [typeGuessMap[0].type];
      //getGuesses();
    })

    return {
      versionOptions,
      typeOptions,
      katakanaModel,
      hiraganaModel,
      getRandomAnswers,
      getRandomItem,
      randomIndex,
      shuffleArray,
      isSymbolDisplay
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
