import { Box, Center, HStack, IBoxProps, Text } from "native-base";
import { TouchableOpacity } from "react-native";

type RadioLabelProps = IBoxProps & {
  value: boolean,
  onPress: () => void,
  title: string,
}

export function RadioLabel({ onPress, title, value, ...rest }: RadioLabelProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
    >
      <HStack alignItems='center' {...rest}>
        <Center
          borderColor={value ? 'lightBlue.500' : 'gray.400'}
          borderWidth={2}
          h={5}
          w={5}
          rounded='full'
        >
          <Box bg={value ? 'lightBlue.500' : 'transparent'} h={3} w={3} rounded='full' />
        </Center>
        <Text ml={2} fontFamily='body' fontSize='md' color='gray.200'>
          { title }
        </Text>
      </HStack>
    </TouchableOpacity>
  )
}
