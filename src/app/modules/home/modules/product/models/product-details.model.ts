export class ProductDetailsModel {

    id: number;
    name: string;
    description: string;
    p_status: boolean;
    p_batch_no: number;
    p_exp_date: Date;
    star_rate: number;
    p_bar_code: number;
    p_about: string;
    p_is_returnable: boolean;
    p_created_by: string;
    p_created_at: Date;
    p_updated_at: Date;
    p_updated_by: string;
    price: number;
    // image: Images[] = [];
    category_name: string;
    category_id: number;
}

// export class Images {
//     image: string;
//     path: string;
// }
