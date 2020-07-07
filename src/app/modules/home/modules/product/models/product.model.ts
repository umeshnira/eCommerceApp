// import { Images } from './product-details.model';
import { Status } from 'src/app/shared/enums/user-status.enum';

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
    quantity: Quantity;
    category: Category;
    price: Price;
    // images: Images[] = [];
}

export class Quantity {

    left_qty: number;
    tota_qty: number;
    inserted_at: Date;
    updated_at: Date;
}

export class Category {

    status: Status;
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




