import { Status } from 'src/app/shared/enums/user-status.enum';
// import { Price } from './product-price.model';
// import { Category } from './product-category.model';
// import { Quantity } from './product-quantity.model';
// import { Image } from './product-image.model';

export class ProductModel {

    name: string;
    description: string;
    batch_no: number;
    exp_date: Date;
    bar_code: string;
    about: string;
    status: Status;
    star_rate: number;
    is_returnable = true;
    created_by = 'Seller';
    updated_by: string;
    left_qty: number;
    total_qty: number;
    category_id: number;
    price: number;
    price_without_offer: number;
    images: Image[] = [];
}

export class Image {

    image: string;
    path: string;
}

export class Quantity {

    left_qty: number;
    tota_qty: number;
    inserted_at: Date;
    updated_at: Date;
}

export class Price {

    price: number;
    price_without_offer: number;
    inserted_at: Date;
    updated_at: Date;
}

export class Category {

    status: Status;
    updated_by: string;
    inserted_by = 'Seller';
    category_id: number;
}



