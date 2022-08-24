import { defineStore } from 'pinia'
import { ref } from 'vue'

// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', () => {
  const katakanaModel = ref({
    name: "Katakana",
    selectedVersions: ref([]),
    selectedTypes: ref([]),
    json: require('@/resource/js/katakana.json'),
    scoreboard: {
      rightAnswers: ref(0),
      wrongAnswers: ref(0)
    }
  })
  
  const hiraganaModel = ref({
    name: "Hiragana",
    selectedVersions: ref([]),
    selectedTypes: ref([]),
    json: require('@/resource/js/hiragana.json'),
    scoreboard: {
      rightAnswers: ref(0),
      wrongAnswers: ref(0)
    }
  })
  return{
    katakanaModel,
    hiraganaModel
  }
})
