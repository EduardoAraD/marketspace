import { UserDTO } from "../../dtos/UserDTO";

import { api } from "../api";

type SignInResponse = {
  token: string;
  user: UserDTO;
  refresh_token: string
}

export async function signInService(email: string, password: string) {
  try {
    const response = await api.post('/sessions', { email, password })
    const data: SignInResponse = response.data;

    return data;
  } catch (error) {
    throw error;
  }
}
