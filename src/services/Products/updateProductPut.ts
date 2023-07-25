import { Product } from "../../dtos/ProductDTO";

import { api } from "../api";

export async function updateProductPutService(id: string, product: Product) {
  try {
    const { data } = await api.put(`/products/${id}`, product)

    return data;
  } catch (error) {
    throw error;
  }
}
