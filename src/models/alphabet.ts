import { Letter } from '@/models/letter';

export class Alphabet {

    public readonly name: string;
    public readonly letters: Letter[];
    public selectedVersions: string[] = [];
    public selectedTypes: string[] = [];
    public rightAnswers: number = 0;
    public wrongAnswers: number = 0;
    
    constructor(name: string, letters: Letter[]) 
    {
        this.name = name;
        this.letters = letters;
    }
}

