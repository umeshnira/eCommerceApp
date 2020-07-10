import { Image } from './product-image.model';

export class ProductDetailsModel {

    id: number;
    name: string;
    description: string;
    exp_date: Date;
    star_rate: number;
    bar_code: number;
    about: string;
    is_returnable: boolean;
    price: number;
    images: Image[] = [];
    category_id: number;
    left_qty: number;
    offer_id: number;
    total_qty: number;

    p_status: boolean;
    p_batch_no: number;
    p_created_by: string;
    p_created_at: Date;
    p_updated_at: Date;
    p_updated_by: string;
    category_name: string;
}



