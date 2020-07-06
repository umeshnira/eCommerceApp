import { Images } from './product-details.model';

export class ProductModel {

    name: string;
    description: string;
    batch_no: number;
    exp_date: Date;
    bar_code: string;
    about: string;
    status = false;
    star_rate: number;
    is_returnable = false;
    inserted_by = 'Seller';
    quantity: Quantity;
    category: Category;
    price: Price;
    images: Images[] = [];
}

export class Quantity {

    left_qty: number;
    tota_qty: number;
    inserted_at: Date;
    updated_at: Date;
}

export class Category {

    status: boolean;
    updated_by: string;
    inserted_by = 'Seller';
    category_id: number;
}

export class Price {

    price: number;
    price_without_offer: number;
    inserted_at: Date;
    updated_at: Date;
}





