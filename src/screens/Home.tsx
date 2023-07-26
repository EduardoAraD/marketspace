import { useCallback, useState } from "react";
import { Box, FlatList, Text, VStack, useToast } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { CardAds } from "../components/CardAds";
import { CardMiniAd } from "../components/CardMiniAd";
import { FooterTabNavigation } from "../components/FooterTabNavigation";
import { HeaderHome } from "../components/HeaderHome";
import { InputSearch } from "../components/InputSearch";
import { Loading } from "../components/Loading";
import { IFilterProps, ModalFilterAds } from "../components/ModalFilterAds";

import { PaymentMethods } from "../dtos/PaymentMethods";
import { ProductHomeDTO } from "../dtos/ProductDTO";

import { FilterProductsServiceProps, getProductsService } from "../services/Products/getProducts";
import { getProductsUserService } from "../services/Products/getProductsByUser";

import { AppError } from "../utils/AppError";

export function Home() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [numberAds, setNumberAds] = useState(0);
  const [search, setSearch] = useState('');
  const [ads, setAds] = useState<ProductHomeDTO[]>([]);
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

  function handleGoDetailsAd( idProductAd: string) {
    navigate("detailsAd", { idProduct: idProductAd })
  }

  async function getMyProductsData() {
    try {
      setLoading(true);

      const myProducts = await getProductsUserService();
      setNumberAds(myProducts.length);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Erro ao buscar seus anúncios. Tente novamente mais tarde.'

      toast.show({
        title: title || 'Erro ao buscar seus anúncios. Tente novamente mais tarde.',
        placement: 'top',
        bg: 'red.500',
        duration: 2000,
      })
    } finally {
      setLoading(false);
    }
  }

  async function getFilterProductData() {
    try {
      setLoadingFilter(true);
      const filterProduct: FilterProductsServiceProps = {}
      if(filter.acceptChange) {
        filterProduct.acceptTrade = filter.acceptChange;
      }
      if(filter.condition !== '') {
        filterProduct.isNew = filter.condition === 'new';
      } 
      if(search !== '') {
        filterProduct.name = search;
      }
      if(filter.pagament.boleto || filter.pagament.cardCredit || filter.pagament.depositBank || filter.pagament.money|| filter.pagament.pix) {
        const listPayment: PaymentMethods[] = []
        if(filter.pagament.boleto) listPayment.push('boleto');
        if(filter.pagament.cardCredit) listPayment.push('card');
        if(filter.pagament.depositBank) listPayment.push('deposit');
        if(filter.pagament.money) listPayment.push('cash');
        if(filter.pagament.pix) listPayment.push('pix');

        filterProduct.paymentMethods = listPayment;
      }

      const products = await getProductsService(filterProduct);
      setAds(products);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Erro ao buscar seus anúncios. Tente novamente mais tarde.'

      toast.show({
        title: title || 'Erro ao buscar seus anúncios. Tente novamente mais tarde.',
        placement: 'top',
        bg: 'red.500',
        duration: 2000,
      })
    } finally {
      setLoadingFilter(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getMyProductsData();
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      getFilterProductData();
    }, [filter, search])
  )

  return (
    <VStack flex={1} bg='gray.600'>
      <VStack pt={6} mt={10} flex={1}>
        <VStack px={6}>
          <HeaderHome />
          <Text mt={8} mb={3} fontFamily='body' fontSize='sm' color='gray.300'>Seus produtos anunciados para venda</Text>
          
          <CardAds numberAds={numberAds} isLoading={loading} />
          
          <Text mt={8} mb={3} fontFamily='body' fontSize='sm' color='gray.300'>Compre produtos variados</Text>
          <InputSearch
            placeholder="Buscar anúncio"
            value={search}
            onChangeText={setSearch}
            onPressFilter={() => {
              setIsShowModal(true);
            }}
          />
        </VStack>
        {loadingFilter ? (
          <Loading />
        ) : (
          <FlatList
            data={ads}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CardMiniAd
                imageUrl={item.product_images[0].path}
                isNew={item.is_new}
                name={item.name}
                price={item.price}
                avatarAdvertiser={item.user.avatar}
              
                onPress={() => handleGoDetailsAd(item.id)}
              />
            )}
            _contentContainerStyle={{ pb: 10, pt: 2, alignSelf: 'center' }}
            contentContainerStyle={ads.length === 0 && {flex: 1, justifyContent: 'center'}}
            ListEmptyComponent={() => (
              <Text color="gray.100" textAlign="center">
                Não há anúncios registrados. {'\n'}
                Vamos anunciar algum produto?
              </Text>
            )}
            ItemSeparatorComponent={() => <Box h={6} w={5} />}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        )}
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
