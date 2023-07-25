import { api } from "../api";

import { removeImagesByIdsService } from "./Images/removeImagesByIds";

export async function removeProductByIdService(id: string, imagesId: string[]) {
  try {
    // await removeImagesByIdsService(imagesId);

    await api.delete(`/products/${id}`);
  } catch (error) {
    throw error;
  }
}
