import { ProductCompleteDTO } from "../../dtos/ProductDTO";

import { api } from "../api";

export async function getProductByIdService(id: string): Promise<ProductCompleteDTO> {
  try {
    const { data } = await api.get(`/products/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
}
