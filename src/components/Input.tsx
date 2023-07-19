import { useState } from 'react';
import {
  Input as InputNB,
  IInputProps,
  Pressable,
  Box,
  FormControl
} from 'native-base';
import { Eye, EyeSlash } from 'phosphor-react-native';

type InputProps = IInputProps & {
  typeInput?: 'password' | 'normal'
  errorMessage?: string;
}

export function Input({ typeInput = 'normal', isInvalid, errorMessage = '', ...rest }: InputProps) {
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
        bg='white'
        borderWidth={1}
        borderColor='white'
        fontFamily='heading'
        fontSize='md'
        placeholderTextColor='gray.400'
        color='gray.100'
        secureTextEntry={typeIconEye === 'close' && typeInput === 'password' }
        InputRightElement={
          typeInput === 'password' ?
          <Pressable p={2} onPress={handleUpdateEye}>
            {typeIconEye === 'open' ? <Eye /> : <EyeSlash />}
          </Pressable> : 
          <Box />
        }
        _focus={{
          borderColor: 'gray.300',
          bg: 'white'
        }}
        _invalid={{
          borderWidth: 1,
          borderColor: 'lightRed.500',
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
