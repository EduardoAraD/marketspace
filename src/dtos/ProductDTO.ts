import { ImageDTO } from "./ImageDTO";
import { PaymentMethods, PaymentMethodsDTO } from "./PaymentMethods";

import { UserResumeDTO } from "./UserDTO";

export type Product = {
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: PaymentMethods[];
}

export type ProductDTO = {
  accept_trade: boolean;
  // created_at: string;
  description: string;
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  payment_methods: PaymentMethodsDTO[];
  price: number;
  product_images: ImageDTO[]
  // updated_at: string;
  user_id: string;
}

export type ProductCompleteDTO = ProductDTO & {
  user: UserResumeDTO;
}

export type ProductHomeDTO = {
  id: string;
  name: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: ImageDTO[];
  payment_methods: PaymentMethodsDTO[];
  user: {
    avatar: string;
  }
}
