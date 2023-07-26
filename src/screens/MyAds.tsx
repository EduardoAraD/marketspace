import { useCallback, useMemo, useState } from "react";
import { VStack, Select, HStack, Text, useTheme, FlatList, Box, useToast } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CaretUp, CaretDown } from "phosphor-react-native";

import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { CardMiniAd } from "../components/CardMiniAd";
import { FooterTabNavigation } from "../components/FooterTabNavigation";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";

import { ProductCompleteDTO, ProductDTO } from "../dtos/ProductDTO";

import { getProductsUserService } from "../services/Products/getProductsByUser";

import { AppError } from "../utils/AppError";

export function MyAds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);
  const [service, setService] = useState("all");
  const [ads, setAds] = useState<ProductDTO[]>([]);

  function handleGoCreateAd() {
    navigate('createAd', { isNew: true, product: {} as ProductCompleteDTO });
  }

  function handleGoDetailsAd(idProductAd: string) {
    navigate("detailsMyAd", { idProduct: idProductAd });
  }

  async function getMyProducts() {
    try {
      setLoading(true);

      const products = await getProductsUserService();

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
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getMyProducts();
    }, [])
  )

  const listProductsAds = useMemo(() => {
    if(service === 'active') return ads.filter(item => item.is_active);
    if(service === 'inactive') return ads.filter(item => !item.is_active)
    return ads;
  }, [service])

  return (
    <VStack flex={1} bg='gray.600'>
      <Header
        title="Meus anúncios"
        showIcon="plus"
        onPressIconEditOrPlus={handleGoCreateAd}
      />
      <VStack flex={1}>
        <HStack p={6} pb={2} justifyContent='space-between' alignItems='center'>
          <Text fontFamily='body' fontSize='sm' color='gray.200'>
            {ads.length} anúncios
          </Text>
          <Select
            selectedValue={service}
            onValueChange={(itemValue) => setService(itemValue)}
            minW={120}
            fontFamily='body'
            fontSize='sm'
            color='gray.100'
            borderColor='gray.500'
            dropdownOpenIcon={<CaretUp weight="bold" size={16} color={colors.gray[300]} />}
            dropdownCloseIcon={<CaretDown weight="bold" size={16} color={colors.gray[300]} />}
          >
            <Select.Item label="Todos" value="all" _text={{
              color: 'gray.200',
              fontFamily: service === 'all' ? 'heading' : 'body',
              fontSize: 'md'
            }}/>
            <Select.Item label="Ativos" value="active" _text={{
              color: 'gray.200',
              fontFamily: service === 'active' ? 'heading' : 'body',
              fontSize: 'md'
            }} />
            <Select.Item label="Inativos" value="inactive" _text={{
              color: 'gray.200',
              fontFamily: service === 'inactive' ? 'heading' : 'body',
              fontSize: 'md'
            }} />
          </Select>
        </HStack>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={listProductsAds}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CardMiniAd
                isActive={item.is_active}
                imageUrl={item.product_images[0].path}
                isMyAd
                isNew={item.is_new}
                name={item.name}
                price={item.price}

                onPress={() => handleGoDetailsAd(item.id)}
              />
            )}
            _contentContainerStyle={{ pb: 10, pt: 3, alignSelf: 'center' }}
            contentContainerStyle={ads.length === 0 && {flex: 1, justifyContent: 'center'}}
            ListEmptyComponent={() => (
              <Text color="gray.100" textAlign="center">
                Não há exercícios registrados ainda. {'\n'}
                Vamos fazer exercícios hoje?
              </Text>
            )}
            ItemSeparatorComponent={() => <Box h={6} w={5} />}
            numColumns={2}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </VStack>
      <FooterTabNavigation selected="myAds" />
    </VStack>
  )
}
