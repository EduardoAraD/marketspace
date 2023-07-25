import { Box, HStack, Heading, Text, VStack } from "native-base";

import { Carousel } from "./Carousel";
import { IconLabel } from "./IconLabel";
import { MoneyText } from "./MoneyText";
import { PhotoUser } from "./PhotoUser";

import { Product } from "../dtos/ProductDTO";

import { api } from "../services/api";

import { maskPrice } from "../utils/mask";

import defaultAvatarImg from '../assets/defaultAvatar.png';

type DetailsAdProps = {
  imagesUrl: string[];
  isActiveAd?: boolean;
  product: Product;
  avatarUser?: string;
  nameUser: string;
}

export function DetailsAdComponent({
  imagesUrl,
  isActiveAd = true,
  avatarUser,
  product,
  nameUser,
}: DetailsAdProps) {
  return (
    <>
      <Carousel images={imagesUrl} isActiveAd={isActiveAd} />
      <VStack p={6}>
        <HStack alignItems='center'>
          <PhotoUser
            imageProps={{
              source: avatarUser ?
                { uri: `${api.defaults.baseURL}/images/${avatarUser}` } :
                defaultAvatarImg,
              alt: 'Foto do anunciante'
            }}
            size={6}
          />
          <Text ml={2} fontFamily='body' fontSize='sm' color='gray.100'>
            {nameUser}
          </Text>
        </HStack>
        <Box mt={5} px={2} bg='gray.500' alignSelf='flex-start' rounded='full'>
          <Heading fontFamily='heading' fontSize='xs' color='gray.200'>
            {product.is_new ? 'NOVO' : 'USADO'}
          </Heading>
        </Box>
        <HStack mt={2} justifyContent='space-between'>
          <Heading flex={1} numberOfLines={1} fontFamily='heading' fontSize='xl' color='gray.100'>
            {product.name}
          </Heading>
          <MoneyText
            money={maskPrice(product.price.toString())}
            fontSizeRS="sm"
            fontSizeMoney="xl"
          />
        </HStack>
        <Text mt={2} fontFamily='body' fontSize='sm' color='gray.200'>
          {product.description}
        </Text>
        <HStack mt={6} alignItems='center'>
          <Heading mr={2} fontFamily='heading' fontSize='sm' color='gray.200'>
            Aceita troca?
          </Heading>
          <Text fontFamily='body' fontSize='sm' color='gray.200'>
            {product.accept_trade ? 'Sim' : 'Não'}
          </Text>
        </HStack>

        <Heading mt={4} mb={1} fontFamily='heading' fontSize='sm' color='gray.200'>
          Pagamentos
        </Heading>
        {product.payment_methods.map((payment) => (
          <IconLabel key={payment} payment_methods={payment} />
        ))}
      </VStack>
    </>
  )
}
