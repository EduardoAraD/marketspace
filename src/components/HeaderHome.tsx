import { HStack, Heading, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { Button } from "./Button";
import { PhotoUser } from "./PhotoUser";

export function HeaderHome() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleGoCreateAd() {
    navigate('createAd');
  }

  return (
    <HStack w='full'>
      <HStack flex={9} alignItems='center'>
        <PhotoUser
          imageProps={{
            source: { uri: 'https://github.com/eduardoarad.png' },
            alt: 'Foto do usuário',
          }}
          size={12}
        />
        <VStack flex={1} ml={2}>
          <Text fontFamily='body' fontSize='md' color='gray.100'>Boas vindas,</Text>
          <Heading fontFamily='heading' fontSize='md' color='gray.100' numberOfLines={1}>Eduardo!</Heading>
        </VStack>
      </HStack>
      <Button
        ml={2}
        title="Criar anúncio"
        icon='plus'
        flex={7}
        typeColorButton="SECUNDARY"
        onPress={handleGoCreateAd}
      />
    </HStack>
  )
}
