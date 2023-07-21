import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { MyAds } from "../screens/MyAds";
import { DetailsAd } from "../screens/DetailsAd";

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  detailsAd: undefined;
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes () {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="myAds" component={MyAds} />
      <Screen name="detailsAd" component={DetailsAd} />
    </Navigator>
  )
}
