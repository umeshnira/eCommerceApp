export class CouponViewListModel {
    id: number;
    name: string;
    code: string;
    description: string;
    price: number;
    percentage: number;
    start_date: Date;
    end_date: Date;
    status: number;
    discount_type: number;
    discount_name: string;
    free_shipping: number;
    on_store: number;
    limit_per_coupon: number;
    limit_per_item: number;
    limit_per_user: number;

}