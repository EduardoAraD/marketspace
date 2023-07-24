import { useState } from "react";
import { Center, HStack, Heading, ScrollView, Text, VStack, useTheme, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { Button } from "../components/Button";
import { DetailsAdComponent } from "../components/DetailsAdComponent";

export type PreviewAdRoutes = {
  photos: {
    uri: string;
    type: string;
    name: string;
  }[],
}

export function PreviewAd() {
  const { photos } = useRoute().params as PreviewAdRoutes;
  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  function handleGoBack() {
    goBack();
  }

  function handlePublishAd() {
    try {
      setLoading(true);

      setTimeout(() => {
        navigate("home")
      }, 1000)
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Erro ao publicar o anúncio. Tente novamente mais tarde',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <VStack flex={1} bg='gray.600'>
      <Center bg='lightBlue.500' px={6} pb={4} pt={16}>
        <Heading fontFamily='heading' fontSize='md' color='gray.700'>
          Pré visualização do anúncio
        </Heading>
        <Text fontFamily='body' fontSize='sm' color='gray.700'>
          É assim que seu produto vai aparecer!
        </Text>
      </Center>

      <ScrollView>
        <DetailsAdComponent
          images={photos.map(photo => photo.uri)}
        />
      </ScrollView>

      <HStack bg='gray.700' px={6} pt={5} pb={7} alignItems='center'>
        <Button
          icon='arrow-left'
          flex={1}
          title="Voltar e editar"
          typeColorButton="DEFAULT"
          mr={3}
          onPress={handleGoBack}
        />
        
        <Button
          icon='tag'
          flex={1}
          title="Publicar"
          isLoading={loading}
          onPress={handlePublishAd}
        />
      </HStack>
    </VStack>
  )
}
