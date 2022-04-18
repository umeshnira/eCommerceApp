import { Image } from "./product-image.model";

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
  seller_id: number;
  left_qty: number;
  offer_id: number;
  total_qty: number;
  batch_no: number;
  product_check: boolean;
  p_status: boolean;
  p_created_by: string;
  p_created_at: Date;
  p_updated_at: Date;
  p_updated_by: string;
  category: string;
  product_id: number;
    product_name: string;
  product_offer_id: number;
}
