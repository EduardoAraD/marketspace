import { useCallback, useState } from "react";
import { ScrollView, VStack, useToast } from "native-base";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

import { useAuth } from "../hooks/useAuth";

import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { Button } from "../components/Button";
import { DetailsAdComponent } from "../components/DetailsAdComponent";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { LoadingDetailsAd } from "../components/LoadingDetailsAd";

import { ProductCompleteDTO } from "../dtos/ProductDTO";

import { api } from "../services/api";
import { getProductByIdService } from "../services/Products/getProductById";
import { removeProductByIdService } from "../services/Products/removeProductById";
import { updateProductActiveService } from "../services/Products/updateProductActive";

import { AppError } from "../utils/AppError";

export type DetailsMyAdRoutes = {
  idProduct: string;
}

export function DetailsMyAd(){
  const { idProduct } = useRoute().params as DetailsMyAdRoutes
  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { user } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [loadingUpdateProduct, setLoadingUpdateProduct] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
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

  function handleEditProductAd() {
    navigate('createAd', { isNew: false, product });
  }

  async function handleUpdateActiveProduct(is_active: boolean) {
    try {
      setLoadingUpdateProduct(true);

      await updateProductActiveService(product.id, { is_active })

      toast.show({
        title: 'Anúncio atualizado com sucesso',
        placement: 'top',
        bg: 'green.500',
        duration: 2000,
      })

      setTimeout(() => {
        navigate("myAds")
      }, 1000)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível alterar o anúncio. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
        duration: 2000,
      })
    } finally {
      setLoadingUpdateProduct(false);
    }
  }

  async function handleRemoveProductAd() {
    try {
      setLoadingRemove(true);

      await removeProductByIdService(product.id, product.product_images.map(item => item.id))

      toast.show({
        title: 'Anúncio removido com sucesso',
        placement: 'top',
        bg: 'green.500',
        duration: 2000,
      })

      setTimeout(() => {
        navigate("myAds")
      }, 1000)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível alterar o anúncio. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
        duration: 2000,
      })
    } finally {
      setLoadingRemove(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadingAdProduct();
    }, [idProduct])
  )

  return (
    <VStack flex={1} bg='gray.600'>
      <Header showIconBack showIcon="edit" onPressIconEditOrPlus={handleEditProductAd} />
      <ScrollView showsVerticalScrollIndicator={false}>
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
            avatarUser={product.user?.avatar ?? user.avatar}
            nameUser={product.user?.name ?? user.name}
          />
        )}
      </ScrollView>
      {loading ? (
        <Loading h={20} />
      ) : (
        <VStack px={6} pb={10} pt={2}>
          {product.is_active ? (
            <Button
              title="Desativar anúncio"
              icon='power'
              typeColorButton="SECUNDARY"
              isLoading={loadingUpdateProduct}
              onPress={() => handleUpdateActiveProduct(false)}
            />
          ) : (
            <Button
              title="Reativar anúncio"
              icon='power'
              isLoading={loadingUpdateProduct}
              onPress={() => handleUpdateActiveProduct(true)}
            />
          )}
          <Button
            mt={2}
            title="Excluir anúncio"
            icon='trash'
            typeColorButton="DEFAULT"
            isLoading={loadingRemove}
            onPress={handleRemoveProductAd}
          />
        </VStack>
      )}      
    </VStack>
  )
}
