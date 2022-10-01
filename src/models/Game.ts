import { Alphabet } from "./Alphabet";
import { AlphabetType } from '@/models/AlphabetType'

export class Game {

    public alphabetType: AlphabetType
    public alphabets: Alphabet[]
    public rightAnswers: number = 0
    public wrongAnswers: number = 0
    public score: number = 0

    constructor(alphabetType: AlphabetType, alphabets: Alphabet[]) {
        this.alphabetType = alphabetType;
        this.alphabets = alphabets;
    }
}

