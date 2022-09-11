export class Letter {
    private readonly kana: string
    private readonly roumaji: string
    private readonly type: string

    constructor(kana: string, roumaji: string, type: string) {
        this.kana = kana;
        this.roumaji = roumaji
        this.type = type
    }
}