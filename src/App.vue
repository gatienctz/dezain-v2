<template>
  <v-app>
    <v-navigation-drawer :style="'border: solid grey 1px;'" location="left" rail>

    </v-navigation-drawer>
    <v-main class="fill-height">
      <v-container :style="'border: solid grey 1px;'" class="pa-1 fill-height" fluid>
        <v-row class="fill-height">
          <v-col :style="'border: solid grey 1px;'" cols="1.5">
            <AlphabetOptionsTab :versionName="'hiraganaModel'"
              :version-options="versionOptions"
              :type-options="typeOptions"
              :selected-types-options="katakanaModel.selectedTypes"
              @update:selectedTypes="updateSelectedTypes"/>
            <AlphabetOptionsTab :versionName="'katakanaModel'" :versionOptions="versionOptions"
              :typeOptions="typeOptions" />
          </v-col>
          <v-col :style="'border: solid grey 1px;'" cols="9">
            <v-container :style="'border: solid grey 1px;'" class="pa-1 fill-height" fluid>
                <v-container :style="'border: solid grey 1px;'" class="pa-1 align-self-start h-50">
                <v-row class="justify-center pa-2 ma-0">
<KanaItem :value="'い'"></KanaItem>
                </v-row>
                </v-container>
                <v-container :style="'border: solid grey 1px;'" class="pa-1 align-self-end h-50">
                <v-row class="justify-center pa-2 ma-0">
<KanaItem :value="'い'"></KanaItem>
<KanaItem :value="'え'"></KanaItem>
<KanaItem :value="'て'"></KanaItem>
                </v-row>
                </v-container>
            </v-container>
          </v-col>
          <v-col :style="'border: solid grey 1px;'" cols="1.5">
            <p>Versions : {{ hiraganaModel.selectedVersions }}</p>
            <p>Types : {{ hiraganaModel.selectedTypes }}</p>
          </v-col>
        </v-row>
      </v-container>
      <v-footer fixed :style="'border: solid grey 1px;'">
      <p>My footer</p>
      </v-footer>
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
import { onMounted } from 'vue'
import { useStore } from '@/store'
import KanaItem from './components/KanaItem.vue'
import AlphabetOptionsTab from '@/components/AlphabetOptionsTab.vue'
import { storeToRefs } from 'pinia';

export default {
  name: 'App',
  components: {
    KanaItem,
    AlphabetOptionsTab
  },
  setup() {

    const store = useStore();
    const { katakanaModel, hiraganaModel } = storeToRefs(store);

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


    const updateSelectedTypes = (selectedTypes) => {
      console.log("updateSelectedTypes", selectedTypes);
      hiraganaModel.selectedTypes = selectedTypes;
    }

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
      //selectedAlphabet.value = [alphabetsMap[0].alphabet];
      //selectedOptions.value = [optionsMap[0].type];
      //selectedTypeGuess.value = [typeGuessMap[0].type];
      //getGuesses();
    })

    return {store,
      versionOptions,
      typeOptions,
      getRandomAnswers,
      getRandomItem,
      randomIndex,
      shuffleArray,
      isSymbolDisplay,
      katakanaModel,
      hiraganaModel,
      updateSelectedTypes
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
