import { TouchableOpacity } from "react-native";
import { HStack, Heading, Text, VStack, useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Tag, ArrowRight } from 'phosphor-react-native';

import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { Loading } from "./Loading";

type CardAdsProps = {
  isLoading?: boolean;
  numberAds: number;
}

export function CardAds({ isLoading = false, numberAds }: CardAdsProps) {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { colors } = useTheme();

  function handleGoMyAds() {
    navigate("myAds")
  }

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
        {isLoading ? (
          <Loading ml={4} flex={0} />
        ) : (
          <VStack ml={4}>
            <Heading fontFamily='heading' fontSize='xl' color='gray.200'>
              {numberAds}
            </Heading>
            <Text fontFamily='body' fontSize='xs' color='gray.200'>
              anúncios ativos
            </Text>
          </VStack>
        )}
      </HStack>
      <TouchableOpacity activeOpacity={0.7} onPress={handleGoMyAds}>
        <HStack alignItems='center' p={3}>
          <Heading mr={2} fontFamily='heading' fontSize='xs' color='blue.500'>Meus anúncios</Heading>
          <ArrowRight color={colors.blue[500]} />
        </HStack>
      </TouchableOpacity>
    </HStack>
  )
}
