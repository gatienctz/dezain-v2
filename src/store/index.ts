import { reactive, ref } from 'vue'
import { Alphabet } from '@/models/Alphabet'
import { AlphabetType } from '@/models/AlphabetType'
import { Game } from '@/models/Game'

const initKatakana = (alphabets: Alphabet[]) => {
  alphabets.push(new Alphabet("katakana", require('@/resource/js/katakana.json')));
}

const initHiragana = (alphabets: Alphabet[]) => {
  alphabets.push(new Alphabet("hiragana", require('@/resource/js/hiragana.json')));
}

const initAlphabets = (alphabetType: String) => {
  const alphabets: Alphabet[] = [];
  switch (alphabetType) {
    case AlphabetType.Hiragana: {
      initHiragana(alphabets);
    }
      break;
    case AlphabetType.Katakana: {
      initKatakana(alphabets);
    }
      break;
    case AlphabetType.Both: {
      initHiragana(alphabets);
      initKatakana(alphabets);
    }
      break;
  }
  return alphabets;
}

const createGame = (alphabetType: String) => {
  const alphabets: Alphabet[] = initAlphabets(alphabetType);
  return reactive(new Game(alphabetType, alphabets));
}

export function useGame(alphabetType: String) {
  return createGame(alphabetType);
}
