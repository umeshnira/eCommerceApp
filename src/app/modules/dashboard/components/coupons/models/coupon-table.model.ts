export class CouponTableModel {
    id: number;
    name: string;
    code: string;
    description: string;
    price: number;
    discount_type: number;
    free_shipping: number;
    on_store: number;
    limit_per_coupon: number;
    limit_per_item: number;
    limit_per_user: number;
    percentage: number;
    status: number;
    start_date: Date;
    end_date: Date;
    created_by: string;
    created_at: Date;
    updated_by: string;
    updated_at: Date;
}
