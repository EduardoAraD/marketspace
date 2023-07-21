import { useState } from "react";
import { Box, FlatList, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { CardAds } from "../components/CardAds";
import { CardMiniAd } from "../components/CardMiniAd";
import { FooterTabNavigation } from "../components/FooterTabNavigation";
import { HeaderHome } from "../components/HeaderHome";
import { InputSearch } from "../components/InputSearch";
import { IFilterProps, ModalFilterAds } from "../components/ModalFilterAds";

export function Home() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const [isShowModal, setIsShowModal] = useState(false);
  const [ads, setAds] = useState<string[]>(['1', '2', '3', '4', '5']);
  const [filter, setFilter] = useState<IFilterProps>({
    acceptChange: false,
    condition: '',
    pagament: {
      boleto: false,
      cardCredit: false,
      depositBank: false,
      money: false,
      pix: false
    }
  });

  function handleGoDetailsAd() {
    navigate("detailsAd")
  }

  return (
    <VStack flex={1} bg='gray.600'>
      <VStack pt={6} mt={10} flex={1}>
        <VStack px={6}>
          <HeaderHome />
          <Text mt={8} mb={3} fontFamily='body' fontSize='sm' color='gray.300'>Seus produtos anunciados para venda</Text>
          <CardAds />
          <Text mt={8} mb={3} fontFamily='body' fontSize='sm' color='gray.300'>Compre produtos variados</Text>
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
            <CardMiniAd onPress={handleGoDetailsAd} />
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
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
      <FooterTabNavigation selected="home" />
      <ModalFilterAds
        filter={filter}
        updateFilter={setFilter}
        isOpen={isShowModal}
        onClose={() => setIsShowModal(false)}
      />
    </VStack>
  )
}
