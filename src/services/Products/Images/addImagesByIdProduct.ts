import { PhotoDTO } from "../../../dtos/PhotoDTO";

import { api } from "../../api";

export async function addImagesByIdProductService(idProduct: string, images: PhotoDTO[]) {
  try {
    const formData = new FormData();

    formData.append('product_id', idProduct);
    for(const image of images) {
      formData.append('images', image as any)
    }

    await api.post('/products/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    
  } catch (error) {
    throw error;
  }
}