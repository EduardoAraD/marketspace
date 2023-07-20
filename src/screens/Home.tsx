import { useState } from "react";
import { Box, Center, FlatList, Text, VStack } from "native-base";

import { HeaderHome } from "../components/HeaderHome";
import { CardAds } from "../components/CardAds";
import { InputSearch } from "../components/InputSearch";
import { CardMiniAd } from "../components/CardMiniAd";
import { FooterTabNavigation } from "../components/FooterTabNavigation";

export function Home() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [ads, setAds] = useState<string[]>(['1', '2', '3', '4', '5']);

  return (
    <VStack flex={1}>
      <VStack pt={6} mt={10} flex={1}>
        <VStack px={6}>
          <HeaderHome />
          <Text mt={8} mb={3} fontFamily='heading' fontSize='sm' color='gray.300'>Seus produtos anunciados para venda</Text>
          <CardAds />
          <Text mt={8} mb={3} fontFamily='heading' fontSize='sm' color='gray.300'>Compre produtos variados</Text>
          <InputSearch
            placeholder="Buscar anúncio"
            onPressFilter={() => {
              setIsShowModal(true);
            }}
          />
        </VStack>
        <FlatList
          data={ads}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <CardMiniAd />
          )}
          _contentContainerStyle={{ pb: 10, pt: 2, alignSelf: 'center' }}
          contentContainerStyle={ads.length === 0 && {flex: 1, justifyContent: 'center'}}
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {'\n'}
              Vamos fazer exercícios hoje?
            </Text>
          )}
          ItemSeparatorComponent={() => <Box h={6} w={5} />}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
      <FooterTabNavigation selected="home" />
    </VStack>
  )
}
