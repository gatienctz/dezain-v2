<template>
  <v-container :style="'border: solid grey 1px;'" class="pa-1 fill-height" fluid>
    <v-row class="fill-height">
      <v-col :style="'border: solid grey 1px;'" cols="1.5">
        <AlphabetOptionsTab v-for="a in alphabets" :key="a.name" :value="a" :selected-types="selectedTypes" @update:selected-types="selectedTypes = $event.target.value"/>
      </v-col>
      <v-col :style="'border: solid grey 1px;'" cols="9">
        <v-container v-if="gameStarted" :style="'border: solid grey 1px;'" class="pa-1 fill-height" fluid>
          <v-container :style="'border: solid grey 1px;'" class="pa-1 align-self-start h-50">
            <v-row class="justify-center pa-2 ma-0">
              <KanaItem :value="displayValue(solution?.letter)"></KanaItem>
            </v-row>
          </v-container>
          <v-container :style="'border: solid grey 1px;'" class="pa-1 align-self-end h-50">
            <v-row class="justify-center pa-2 ma-0">
              <KanaItem v-for="proposal in proposals" :value="displayValue(proposal.letter)" :is-correct="proposal.isCorrect" :is-wrong="proposal.isWrong" :key="proposal.letter.kana" @click="verifyAnswer(proposal)"></KanaItem>
            </v-row>
          </v-container>
          <v-btn @click="initTurn()" :active="gameStarted"> Continuer </v-btn>
          <v-overlay contained relative v-model="gameStarted">
            <v-btn color="success" @click="startGame()">
              Commencer la partie !
            </v-btn>
          </v-overlay>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import KanaItem from '@/components/KanaItem.vue'
import AlphabetOptionsTab from '@/components/AlphabetOptionsTab.vue'
import { useGame } from '@/store';
import { defineComponent, ref, Ref, onMounted, toRef, PropType } from 'vue'
import { AlphabetType } from '@/models/AlphabetType';
import { GameMode } from '@/models/GameMode';
import { Letter } from '@/models/Letter';
import { Alphabet } from '@/models/Alphabet';

interface Proposal {
  letter: Letter,
  isCorrect: boolean,
  isWrong: boolean
}

export default defineComponent({
  props: {
    gameMode: { type: Object as PropType<GameMode>, required: true },
    alphabetType: { type: Object as PropType<AlphabetType>, required: true },
    initGame: { type: Boolean, required: true }
  },
  components: {
    KanaItem,
    AlphabetOptionsTab
  },
  setup(props) {

    const game = useGame(props.alphabetType);
    const alphabets = toRef(game, 'alphabets');
    const poolLetters: Ref<Letter[]> = ref([]);
    const proposals: Ref<Proposal[]> = ref([]);
    var solution: Ref<Proposal | undefined> = ref(undefined);
    const gameStarted: Ref<boolean> = ref(false);
    const isSymbol: Ref<boolean> = ref(true);
    const selectedTypes: Ref<string[]> = ref([]);

    onMounted(() => {
      gameStarted.value = false;
    })

    const initTurn = () => {
      poolLetters.value = setupAlphabet(alphabets.value);
      solution.value = { letter: getRandomLetter(poolLetters.value) as Letter, isCorrect: false, isWrong: false };
      proposals.value = getRandomProposals(poolLetters.value, solution.value.letter);
      isSymbol.value = isSymbolDisplay(selectedTypes.value);
    }

    const startGame = () => {
      initTurn();
      gameStarted.value = true;
    }

    const displayValue = (letter: Letter | undefined) => {
      if(letter !== undefined)
        return (isSymbol.value) ? letter.kana : letter.roumaji;
    }

    const setupAlphabet = (selectedAlphabets: Alphabet[]) => {
      var tmpAlphabet: Alphabet[] = selectedAlphabets;
      var poolLetters: Letter[] = [];
      tmpAlphabet.forEach(alphabet => {
        poolLetters.concat(alphabet.letters.filter(letter => alphabet.selectedVersions.includes(letter.type)))
      });
      return poolLetters;
    }

    const verifyAnswer = (item: Proposal) => {
      if(solution.value !== undefined){
        if(item.letter.roumaji === solution.value.letter.roumaji) {
          game.rightAnswers++; 
          item.isCorrect = true;
         } 
         else{
          game.wrongAnswers++;
          item.isWrong = true;
          
         }
      }
    }

    const randomIndex = (array: Object[]) => {
      return Math.floor(Math.random() * array.length);
    }

    const getRandomLetter = (array: Object[]) => {
      return array[randomIndex(array)];
    }

    const shuffleArray = (arr: Object[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    const isSymbolDisplay = (types: Object[]) => {
      return types[randomIndex(types)] === 'kana';
    }

    const getRandomProposals = (array: Letter[], solution: Letter, possibleAnswer: number = 3) => {
      const proposalSolution: Proposal = {letter: solution, isCorrect: false, isWrong: false};
      const answers: Proposal[] = [proposalSolution];
      possibleAnswer--;
      //Get random answers
      for (let i = 0; i < possibleAnswer; i++) {
        var item: Proposal;
        do {
          item = {letter: getRandomLetter(array) as Letter, isCorrect: false, isWrong: false};
        }
        while (answers.includes(item))
        answers.push(item);
      }
      shuffleArray(answers);
      return answers;
    }

    return {
      alphabets,
      initTurn,
      startGame,
      verifyAnswer,
      displayValue,
      gameStarted,
      poolLetters,
      selectedTypes,
      proposals,
      solution
    }
  }
});
</script>

<style scoped>

</style>