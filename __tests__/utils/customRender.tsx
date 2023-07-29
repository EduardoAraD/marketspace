import { ReactElement, ReactNode } from "react";
import { RenderOptions, render } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from 'native-base';

import { THEME } from "../../src/theme";

type ProviderProps = {
  children: ReactNode;
}

function Providers({ children }: ProviderProps) {
  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <NativeBaseProvider theme={THEME}>
        {children}
      </NativeBaseProvider>
    </SafeAreaProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react-native';
export { customRender as render, Providers };
