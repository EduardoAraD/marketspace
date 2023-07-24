import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { CreateAd } from "../screens/CreateAd";
import { DetailsAd } from "../screens/DetailsAd";
import { DetailsMyAd } from "../screens/DetailsMyAd";
import { Home } from "../screens/Home";
import { MyAds } from "../screens/MyAds";
import { PreviewAd, PreviewAdRoutes } from "../screens/PreviewAd";

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  detailsAd: undefined;
  detailsMyAd: undefined;
  createAd: undefined;
  previewAd: PreviewAdRoutes;
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
      <Screen name='detailsMyAd' component={DetailsMyAd} />
      <Screen name='createAd' component={CreateAd} />
      <Screen name='previewAd' component={PreviewAd} />
    </Navigator>
  )
}
