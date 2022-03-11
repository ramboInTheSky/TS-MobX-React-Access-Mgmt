export class Tag {
    public tagNumber: string | null = null

    constructor(tag?: string) {
        this.tagNumber = tag || null
    }
}
