import { Center, HStack, Text } from "native-base";
import { X } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type MiniCardOptionProps = TouchableOpacityProps & {
  title: string;
  isSelected: boolean;
}

export function MiniCardOption({ isSelected, title, ...rest }: MiniCardOptionProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      <HStack
        bg={isSelected ? 'lightBlue.500' : 'gray.500'}
        rounded='full' 
        py={1.5}
        mr={2}
        pl={4}
        pr={isSelected ? 2 : 4}
      >
        <Text
          fontFamily='heading'
          fontSize='xs'
          color={isSelected ? 'white' : 'gray.300'}
        >{title}</Text>
        {isSelected && (
          <Center bg='gray.700' rounded='full' h={4} w={4} ml={1.5}>
            <X size={14} />
          </Center>
        )}
      </HStack>
    </TouchableOpacity>
  )
}
