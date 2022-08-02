<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import katakana from './resource/js/katakana.json'
import hiragana from './resource/js/hiragana.json'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup(){
    const options = [{'Handakuten':'handakuon'}, {"Dakuten":'dakuon'}, {'Gojūon':'gojuuon'}, {'Yōon':'youon'}]

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
      getHiraganaByRoumaji
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
