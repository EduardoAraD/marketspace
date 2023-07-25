import { useState } from "react";
import { Center, HStack, Heading, ScrollView, Text, VStack, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { useAuth } from "../hooks/useAuth";

import { Button } from "../components/Button";
import { DetailsAdComponent } from "../components/DetailsAdComponent";

import { ImageDTO } from "../dtos/ImageDTO";
import { PhotoDTO } from "../dtos/PhotoDTO";
import { Product } from "../dtos/ProductDTO";

import { api } from "../services/api";
import { addImagesByIdProductService } from "../services/Products/Images/addImagesByIdProduct";
import { createProductService } from "../services/Products/createProduct";
import { removeImagesByIdsService } from "../services/Products/Images/removeImagesByIds";
import { updateProductPutService } from "../services/Products/updateProductPut";

import { AppError } from "../utils/AppError";

export type PreviewAdRoutes = {
  idProduct: string;
  photosOld: ImageDTO[];
  photos: PhotoDTO[],
  product: Product,
}

export function PreviewAd() {
  const { photos, product, idProduct, photosOld } = useRoute().params as PreviewAdRoutes;
  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();
  const { user: { avatar, name } } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  function handleGoBack() {
    goBack();
  }

  async function handlePublishAd() {
    try { 
      setLoading(true);

      const { id } = await createProductService(product);
      await addImagesByIdProductService(id, photos);

      toast.show({
        title: 'Anúncio publicado com sucesso.',
        placement: 'top',
        bg: 'green.500',
        duration: 2000,
      })

      setTimeout(() => {
        navigate('myAds')
      }, 1000)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Erro ao publicar o anúncio. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        duration: 2000,
      })
    } finally {
      setLoading(false);
    }
  }

  async function handleEditPublish(){
    try {
      setLoading(true);

      const imagesOldPerm = photos.filter(({ type }) => type === '');
      
      const idsImageRemove = photosOld.filter(item => !imagesOldPerm.find(
        photo => photo.uri === `${api.defaults.baseURL}/images/${item.path}`
      )).map(i => i.id);
      
      const newPhotos = photos.filter(({ type }) => type !== '');
      if(idsImageRemove.length > 0) {
        await removeImagesByIdsService(idsImageRemove);
      }
      if(newPhotos.length > 0) {
        await addImagesByIdProductService(idProduct, newPhotos);
      }

      await updateProductPutService(idProduct, product);

      toast.show({
        title: 'Anúncio alterado com sucesso.',
        placement: 'top',
        bg: 'green.500',
        duration: 2000,
      })

      setTimeout(() => {
        navigate('myAds');
      }, 1500)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Erro ao publicar o anúncio. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        duration: 2000,
      })
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    if(idProduct === '') {
      return handlePublishAd();
    } else {
      return handleEditPublish()
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
          imagesUrl={photos.map(photo => photo.uri)}
          product={product}
          avatarUser={avatar}
          nameUser={name}
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
          onPress={handlePublish}
        />
      </HStack>
    </VStack>
  )
}
