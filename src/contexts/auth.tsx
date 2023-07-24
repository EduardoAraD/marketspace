import React, { createContext, useEffect, useState } from "react";

import { UserDTO } from "../dtos/UserDTO";

import { api } from "../services/api";
import { signInService } from "../services/User/signIn";

import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "../storage/storageAuthToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "../storage/storageUser";

export type AuthContextDataProps = {
  user: UserDTO;
  loadingUserStorageData: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loadingUserStorageData, setLoadingUserStorageData] = useState(true);
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  function updateUserAndToken(userData: UserDTO, token: string) {
    setUser(userData);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async function saveStorageUserAndToken(userData: UserDTO, token: string, refresh_token: string) {
    try {
      setLoadingUserStorageData(true);

      await storageUserSave(userData)
      await storageAuthTokenSave({ token, refresh_token })
    } catch (error) {
      throw error;
    } finally {
      setLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {

      const data = await signInService(email, password);

      updateUserAndToken(data.user, data.token);
      await saveStorageUserAndToken(data.user, data.token, data.refresh_token);

    } catch (error) {
      throw error;
    }
  }

  async function laodingData() {
    try {
      setLoadingUserStorageData(true);

      const userStorage = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      updateUserAndToken(userStorage, token);

    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setLoadingUserStorageData(true);

      await storageUserRemove();
      await storageAuthTokenRemove();

      updateUserAndToken({} as UserDTO, '');
    } catch (error) {
      throw error;
    } finally {
      setLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    laodingData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    }
  }, [signOut]);

  return (
    <AuthContext.Provider value={{
      user,
      loadingUserStorageData,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
