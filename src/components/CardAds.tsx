import { HStack, Heading, Icon, Text, VStack, useTheme } from "native-base";
import { Tag, ArrowRight } from 'phosphor-react-native';
import { TouchableOpacity } from "react-native";

export function CardAds() {
  const { colors } = useTheme();

  return (
    <HStack
      w='full'
      py={2}
      pl={4}
      pr={2}
      bg='lightBlue.500:alpha.10'
      rounded={6}
      justifyContent='space-between'
      alignItems='center'
    >
      <HStack alignItems='center'>
        <Tag size={22} color={colors.blue[500]} />
        <VStack ml={4}>
          <Heading fontFamily='body' fontSize='xl' color='gray.200'>4</Heading>
          <Text fontFamily='heading' fontSize='xs' color='gray.200'>anúncios ativos</Text>
        </VStack>
      </HStack>
      <TouchableOpacity activeOpacity={0.7}>
        <HStack alignItems='center' p={3}>
          <Heading mr={2} fontFamily='body' fontSize='xs' color='blue.500'>Meus anúncios</Heading>
          <ArrowRight color={colors.blue[500]} />
        </HStack>
      </TouchableOpacity>
    </HStack>
  )
}
