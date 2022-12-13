export class Category {
    constructor(
        public category: [ 
            {bookList: {
            giftNumber: number,
            category: number,
            name: string,
            cost: number,
            desc: string,
            image: string,
            url: string
            }
            },
            {clothingList: {
                giftNumber: number,
                category: number,
                name: string,
                cost: number,
                desc: string,
                image: string,
                url: string
                }
            },
            {electronicsList: {
                giftNumber: number,
                category: number,
                name: string,
                cost: number,
                desc: string,
                image: string,
                url: string
                }
            },
            {gamesList: {
                giftNumber: number,
                category: number,
                name: string,
                cost: number,
                desc: string,
                image: string,
                url: string
                }
            },
            {toysList: {
                giftNumber: number,
                category: number,
                name: string,
                cost: number,
                desc: string,
                image: string,
                url: string
                }
            },
            {miscList: {
                giftNumber: number,
                category: number,
                name: string,
                cost: number,
                desc: string,
                image: string,
                url: string
                }
            }
        ]
    ) {}
}