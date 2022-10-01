<template>
  <v-container :style="'border: solid grey 1px;'" class="pa-1 fill-height" fluid>
    <v-row class="fill-height">
      <v-col :style="'border: solid grey 1px;'" cols="1.5">
            <AlphabetOptionsTab v-for="a in alphabets" :key="a.name" :value="a" />
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
          <v-overlay contained relative v-model="gameStarted">
            <v-btn color="success" @click="gameStarted = true">
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
import { defineComponent, ref, Ref, onMounted, toRef } from 'vue'

export default defineComponent({
  props: {
        gameMode: { type: Number, required: true },
        alphabetType: { type: Number, required: true }
    },
    components: {
    KanaItem,
    AlphabetOptionsTab
},
  setup(props) {
    
    const game = useGame(props.alphabetType);
    const alphabets = toRef(game, 'alphabets');
    const gameStarted: Ref<boolean> = ref(false);

    onMounted(() => {
      gameStarted.value = false;
    })

    return {
      alphabets,
      gameStarted
    }
  }
});
</script>

<style scoped>

</style>