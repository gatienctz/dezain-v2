export class Letter {
    public readonly kana: string
    public readonly roumaji: string
    public readonly type: string

    constructor(kana: string, roumaji: string, type: string) {
        this.kana = kana;
        this.roumaji = roumaji
        this.type = type
    }
}