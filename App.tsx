import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

import { AuthProvider } from './src/contexts/auth';

import { Routes } from './src/routes';

import { Loading } from './src/components/Loading';

import { THEME } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <AuthProvider>
        {!fontsLoaded ? <Loading /> : <Routes /> }
      </AuthProvider>
    </NativeBaseProvider>
  );
}
