import { api } from "../../api";

/* Remove as images a partir do seu id(image) */
export async function removeImagesByIdsService(idsImages: string[]) {
  try {
    await api.delete('/products/images', { data: { images: idsImages } })
  } catch (error) {
    throw error;
  }
}
