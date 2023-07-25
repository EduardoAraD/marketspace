import { Product } from "../../dtos/ProductDTO";

import { api } from "../api";

type ResponseCreateProduct = {
  id: string;
}

export async function createProductService(product: Product): Promise<ResponseCreateProduct> {
  try {
    const { data } = await api.post('/products', product);

    return data;
  } catch (error) {
    throw error;
  }
}
