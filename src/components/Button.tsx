import { Text, Button as ButtonNB, IButtonProps, Icon, HStack } from "native-base";
import { Feather } from '@expo/vector-icons';

type BottomColorBgProps = 'PRIMARY' | 'SECUNDARY' | 'DEFAULT'

type ButtonProps = IButtonProps & {
  title: string;
  icon?: keyof typeof Feather.glyphMap | null;
  typeColorButton?: BottomColorBgProps;
}

export function Button({ title, icon = null, typeColorButton = 'PRIMARY', ...rest }: ButtonProps) {
  return (
    <ButtonNB
      w='full'
      p={3}
      bg={typeColorButton === 'PRIMARY' ? 'lightBlue.500' : typeColorButton === 'SECUNDARY' ? 'gray.100': 'gray.400'}
      rounded='md'
      _pressed={{
        bg: typeColorButton === 'PRIMARY' ? 'blue.500' : typeColorButton === 'SECUNDARY' ? 'gray.200': 'gray.500'
      }}
      {...rest}
    >
      <HStack alignItems='center'>
        {icon !== null && (
          <Icon
            as={Feather}
            name={icon}
            mr={2}
            color={typeColorButton === 'DEFAULT' ? 'gray.200' : 'gray.700'}
          />
        )}
        <Text
          fontFamily='body'
          fontSize='sm'
          color={typeColorButton === 'DEFAULT' ? 'gray.200' : 'gray.700'}
        >{title}</Text>
      </HStack>
    </ButtonNB>
  )
}