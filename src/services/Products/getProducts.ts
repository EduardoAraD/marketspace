import { ProductHomeDTO } from "../../dtos/ProductDTO";

import { api } from "../api";

export async function getProductsService(): Promise<ProductHomeDTO[]> {
  try {
    const { data } = await api.get('/products');
    return data;
  } catch (error) {
    throw error;
  }
}