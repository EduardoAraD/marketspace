import { PhotoDTO } from "../../dtos/PhotoDTO";

import { api } from "../api";

export async function createUserService(
  avatar: PhotoDTO,
  name: string,
  email: string,
  tel: string,
  password: string
) {
  try {
    const formData = new FormData()
    formData.append('avatar', avatar as any);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('tel', tel);
    formData.append('password', password);

    await api.post('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })

  } catch (error) {
    throw error;
  }
}
