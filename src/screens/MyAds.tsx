import { Center, Text, VStack } from "native-base";
import { FooterTabNavigation } from "../components/FooterTabNavigation";

export function MyAds() {
  return (
    <VStack flex={1}>
      <Center flex={1}>
        <Text>Meus anuncios</Text>
      </Center>
      <FooterTabNavigation selected="myAds" />
    </VStack>
  )
}
