import { api } from "../api";

type ProductPatch = {
  is_active: boolean
}

export async function updateProductActiveService(id: string, product: ProductPatch) {
  try {
    const { data } = await api.patch(`/products/${id}`, product);

    return data;
  } catch (error) {
    throw error;
  }
}
