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
            </v-container>
          </v-col>
          <v-col v-for="a in alphabets" :key="a.name" :value="a" :style="'border: solid grey 1px;'" cols="1.5">
            <p>Versions : {{ a.selectedVersions }}</p>
            <p>Types : {{ a.selectedTypes }}</p>
          </v-col>
        </v-row>
        <v-overlay contained v-model="gameStarted" >
            <v-btn color="success" @click="gameStarted = true">
            Commencer la partie !
          </v-btn>
        </v-overlay>
      </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue'

export default defineComponent({
    setup(){

        const gameStarted: Ref<boolean> = ref(false);

        onMounted(() => {
            gameStarted.value = false;
        })

        return{
            gameStarted
        }
    }
});
</script>

<style scoped>

</style>