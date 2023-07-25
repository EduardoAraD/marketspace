import { ProductDTO } from "../../dtos/ProductDTO";

import { api } from "../api";

export async function getProductsUserService(): Promise<ProductDTO[]> {
  try {
    const { data } = await api.get('/users/products');

    const products: ProductDTO[] = data;
    return products.filter(item => item.product_images.length > 0);
  } catch (error) {
    throw error;
  }
}
