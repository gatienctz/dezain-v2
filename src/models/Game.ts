import { Alphabet } from "./Alphabet";

export class Game {

    public alphabetType: String
    public alphabets: Alphabet[]
    public rightAnswers: number = 0
    public wrongAnswers: number = 0
    public score: number = 0

    constructor(alphabetType: String, alphabets: Alphabet[]) {
        this.alphabetType = alphabetType;
        this.alphabets = alphabets;
    }
}

