import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";

import { useAuth } from "../hooks/useAuth";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { Loading } from "../components/Loading";

export function Routes() {
  const { user, loadingUserStorageData } = useAuth();

  if(loadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg='gray.700'>
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
