import { ref } from 'vue'
import { Alphabet } from '@/models/alphabet'

const alphabets = ref([])
console.debug('Loading alphabets...')
alphabets.value.push(new Alphabet("hiragana", require('@/resource/js/hiragana.json')));
alphabets.value.push(new Alphabet("katakana", require('@/resource/js/katakana.json')));
console.debug('Alphabets loaded.')

export function useAlphabets() {
  return alphabets
}
