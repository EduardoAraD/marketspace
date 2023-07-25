import { useCallback, useState } from "react";
import { Linking } from "react-native";
import { HStack, ScrollView, VStack, useToast } from "native-base";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

import { Button } from "../components/Button";
import { DetailsAdComponent } from "../components/DetailsAdComponent";
import { Header } from "../components/Header";
import { LoadingDetailsAd } from "../components/LoadingDetailsAd";
import { MoneyText } from "../components/MoneyText";

import { ProductCompleteDTO } from "../dtos/ProductDTO";

import { api } from "../services/api";
import { getProductByIdService } from "../services/Products/getProductById";

import { AppError } from "../utils/AppError";
import { maskPrice } from "../utils/mask";

export type DetailsAdRoutes = {
  idProduct: string;
}

export function DetailsAd() {
  const { idProduct } = useRoute().params as DetailsAdRoutes;
  const { goBack } = useNavigation();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductCompleteDTO>({} as ProductCompleteDTO)

  async function loadingAdProduct () {
    try {
      setLoading(true);

      const product = await getProductByIdService(idProduct);

      setProduct(product);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível encontrar o anúncio'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
        duration: 2000
      })

      setTimeout(() => {
        goBack()
      }, 1000)
    } finally {
      setLoading(false);
    }
  }

  function handleOpenWhats() {
    console.log(product.user.tel);
    console.log(`https://wa.me/55${product.user.tel.replace(/\D/g,'')}`);
    Linking.openURL(`https://wa.me/55${product.user.tel.replace(/\D/g,'')}`)
  }

  useFocusEffect(
    useCallback(() => {
      loadingAdProduct();
    }, [idProduct])
  )

  return (
    <VStack flex={1} bg='gray.600'>
      <Header showIconBack />

      <ScrollView>
      {loading ? (
          <LoadingDetailsAd />
        ) : (
          <DetailsAdComponent
            imagesUrl={product.product_images?.length > 0 ?
              product.product_images.map(image => `${api.defaults.baseURL}/images/${image.path}`) :
              []
            }
            product={{
              accept_trade: product.accept_trade,
              description: product.description,
              is_new: product.is_new,
              name: product.name,
              payment_methods: product.payment_methods?.map(item => item.key) ?? [],
              price: product.price ?? 0,
            }}
            isActiveAd={product.is_active}
            avatarUser={product.user?.avatar ?? ''}
            nameUser={product.user?.name ?? ''}
          />
        )}
      </ScrollView>

      <HStack bg='gray.700' px={6} pt={5} pb={7} alignItems='center'>
        <MoneyText
          flex={1}
          money={maskPrice(String(product.price ?? 0))}
          fontSizeRS="sm"
          fontSizeMoney="xl"
        />
        <Button
          icon='phone-call'
          flex={1}
          title="Entrar em contato"
          onPress={handleOpenWhats}
        />
      </HStack>
    </VStack>
  )
}
