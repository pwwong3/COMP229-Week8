export class Book {
    constructor(
        public _id?: number,
        public name?: string,
        public author?: string,
        public published?: string,
        public description?: string,
        public price?: number
    ){}

    public toString(): string {
        return `Book
        --------------------------------
        Name       : ${this.name}
        Author     : ${this.author}
        Published  : ${this.published}
        Discription: ${this.description}
        Price      : ${this.price}
        --------------------------------`;
    }
}