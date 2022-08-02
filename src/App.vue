<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <v-btn-toggle mandatory multiple v-model="selectedAlphabet">
    <v-btn value="katakana">Katakana</v-btn>
    <v-btn value="hiragana">Hiragana</v-btn>
  </v-btn-toggle>
  <p> {{ selectedAlphabet }}</p>
  <Card name="kana.name" symbol="kana.kana" v-for="kana in katakana" :key="kana.name"></Card>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import katakana from './resource/js/katakana.json'
import hiragana from './resource/js/hiragana.json'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Card
  },
  setup(){
    const options = [{'Handakuten':'handakuon'}, {"Dakuten":'dakuon'}, {'Gojūon':'gojuuon'}, {'Yōon':'youon'}]
    const selectedAlphabet = ["katakana"];
    const getKataKanaByRoumaji = (roumaji) => {
      for(var kana in katakana){
        if(kana.roumaji === roumaji)
          return kana;
      }
    }

    const getHiraganaByRoumaji = (roumaji) => {
      for(var kana in hiragana){
        if(kana.roumaji === roumaji)
          return kana;
      }
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
