export class Categories {

    id: string;
    name: string;
    expanded: boolean;
    subCategories: SubCategories[];
}

export class SubCategories {

    id: string;
    name: string;
}

