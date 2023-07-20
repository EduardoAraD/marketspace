import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    blue: {
      500: '#364D9D',
    },
    lightBlue: {
      500: '#647AC7'
    },
    red: {
      900: '#EE7979',
    },
    gray: {
      100: '#1A181B',
      200: '#3E3A40',
      300: '#5F5B62',
      400: '#9F9BA1',
      500: '#D9D8DA',
      600: '#EDECEE',
      700: '#F7F7F8'
    }
  },
  fonts: {
    body: 'Karla_400Regular',
    heading: 'Karla_700Bold',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    xl: 20,
    xlg: 24
  },
  sizes: {
    15: 60,
    22: 88,
  }
})
