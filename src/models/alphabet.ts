import { Letter } from '@/models/letter';

export class Alphabet {
    private readonly name: string;
    private readonly letters: Letter[];
    private selectedVersions: string[] = [];
    private selectedTypes: string[] = [];
    private rightAnswers: number = 0;
    private wrongAnswers: number = 0;
    
    constructor(name: string, letters: Letter[]) 
    {
        this.name = name;
        this.letters = letters;
    }
}

