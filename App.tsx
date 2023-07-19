import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

import { Routes } from './src/routes';

import { THEME } from './src/theme';

import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      {!fontsLoaded ? <Loading /> : <Routes /> }
    </NativeBaseProvider>
  );
}
