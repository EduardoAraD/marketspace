import { useState } from 'react';
import {
  Input as InputNB,
  IInputProps,
  Pressable,
  Box,
  FormControl,
  useTheme
} from 'native-base';
import { Eye, EyeSlash } from 'phosphor-react-native';

type InputProps = IInputProps & {
  typeInput?: 'password' | 'normal'
  errorMessage?: string;
}

export function Input({ typeInput = 'normal', isInvalid, errorMessage = '', ...rest }: InputProps) {
  const { colors } = useTheme();
  const invalid = !!errorMessage || isInvalid ;

  const [typeIconEye, setTypeIconEye] = useState<'open' | 'close'>('close');

  function handleUpdateEye() {
    if(typeIconEye === 'open') {
      setTypeIconEye('close');
    } else {
      setTypeIconEye('open');
    }
  }

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <InputNB
        w='100%'
        px={4}
        py={3}
        rounded={6}
        bg='gray.700'
        borderColor='gray.700'
        borderWidth={1}
        fontFamily='heading'
        fontSize='md'
        placeholderTextColor='gray.400'
        color='gray.100'
        secureTextEntry={typeIconEye === 'close' && typeInput === 'password' }
        InputRightElement={
          typeInput === 'password' ?
          <Pressable p={2} onPress={handleUpdateEye}>
            {typeIconEye === 'open' ? <Eye color={colors.gray[300]} /> : <EyeSlash color={colors.gray[300]} />}
          </Pressable> : 
          <Box />
        }
        _focus={{
          borderColor: 'gray.300',
          bg: 'gray.700'
        }}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.900',
        }}
        isInvalid={isInvalid}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
