import { Letter } from '@/models/letter';

export class Alphabet {
    private readonly name: string;
    private readonly letters: Letter[];
    private selectedVersions: string[] = [];
    private selectedTypes: string[] = [];
    private rightAnswers: number;
    private wrongAnswers: number;
    
    constructor(name: string, letters: Letter[], rightAnswers: number, wrongAnswers: number) 
    {
        this.name = name;
        this.letters = letters;
        this.rightAnswers = rightAnswers;
        this.wrongAnswers = wrongAnswers;
    }
}

