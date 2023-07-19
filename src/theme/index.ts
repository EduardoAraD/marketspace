import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    blue: {
      500: '#364D9D',
    },
    lightBlue: {
      500: '#647AC7'
    },
    lightRed: {
      500: '#EE7979',
    },
    gray: {
      1: '#1A181B',
      2: '#3E3A40',
      3: '#5F5B62',
      4: '#9F9BA1',
      5: '#D9D8DA',
      6: '#EDECEE',
      7: '#F7F7F8'
    }
  },
  fonts: {
    regular: 'Karla_400Regular',
    bold: 'Karla_700Bold',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    xl: 20,
    xlg: 24
  },
})
