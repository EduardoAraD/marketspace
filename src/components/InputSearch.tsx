import { TouchableOpacity } from 'react-native';
import {
  Input as InputNB,
  IInputProps,
  Box,
  useTheme,
  HStack
} from 'native-base';
import { MagnifyingGlass, Faders } from 'phosphor-react-native';

type InputProps = IInputProps & {
  onPressFilter: () => void;
}

export function InputSearch({ onPressFilter , ...rest }: InputProps) {
  const { colors } = useTheme();

  return (
    <InputNB
      w='100%'
      pl={4}
      pr={0}
      py={3}
      rounded={6}
      bg='gray.700'
      borderColor='gray.700'
      borderWidth={1}
      fontFamily='heading'
      fontSize='md'
      placeholderTextColor='gray.400'
      color='gray.100'
      InputRightElement={
        <HStack alignItems='center'>
          <Box p={3}>
            <MagnifyingGlass color={colors.gray[200]} size={20} />
          </Box>
          <Box h={18} w={0.25} bg='gray.400' />
          
          <TouchableOpacity activeOpacity={0.7} onPress={onPressFilter}>
            <Box p={3}>
              <Faders color={colors.gray[200]} size={20} />
            </Box>
          </TouchableOpacity>
        </HStack>
      }
      _focus={{
        borderColor: 'gray.300',
        bg: 'gray.700'
      }}
      _invalid={{
        borderWidth: 1,
        borderColor: 'red.900',
      }}
      {...rest}
    />
  )
}
