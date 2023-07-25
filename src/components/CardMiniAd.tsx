import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Box, HStack, Image, Text, VStack } from "native-base"

import { MoneyText } from "./MoneyText"
import { PhotoUser } from "./PhotoUser"

import { api } from "../services/api"

import { maskPrice } from "../utils/mask"

import defaultAvatarImg from '../assets/defaultAvatar.png';

type CardMiniAd = TouchableOpacityProps & {
  isActive?: boolean;
  name: string;
  imageUrl: string;
  price: number;
  isNew: boolean;
  avatarAdvertiser?: string;
  isMyAd?: boolean;
}

export function CardMiniAd({
  isActive = true,
  imageUrl,
  isMyAd = false,
  isNew,
  name,
  price,
  avatarAdvertiser,
  ...rest
}: CardMiniAd) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      <VStack w={Dimensions.get('window').width / 2 - 36} mx={2}>
        <Box>
          <Image
            source={{ uri: `${api.defaults.baseURL}/images/${imageUrl}` }}
            w='full'
            h={100}
            rounded={6}
            alt="Foto do anúncio"
            resizeMode="cover"
          />
          <HStack
            alignItems='flex-start'
            justifyContent='space-between'
            w='full'
            position='absolute'
            p={1}
          >
            {isMyAd ? (
              <Box />
            ) : (
              <PhotoUser
                imageProps={{
                  source: avatarAdvertiser ?
                    { uri: `${api.defaults.baseURL}/images/${avatarAdvertiser}` } :
                    defaultAvatarImg,
                  alt: 'Foto do anunciante'
                }}
                size={6}
                borderWidth={0.25}
                borderColor='gray.700'
              />
            )}
            <Box bg={isNew ? 'blue.500' : 'gray.200'} px={2} py={0.5} rounded='full'>
              <Text fontFamily='heading' fontSize={10} color='white' p={0}>
                {isNew ? 'NOVO' : 'USADO'}
              </Text>
            </Box>
          </HStack>

          {!isActive && (
            <>
              <Box
                h={100}
                bg="gray.100"
                opacity={0.45}
                rounded='sm'
                p={1}
                mt={-100}
                justifyContent='flex-end'
              />
              <Text 
                fontFamily='heading'
                fontSize={11}
                color='gray.700'
                position='absolute'
                bottom={0}
                p={1}
              >
                ANÚNCIO DESATIVADO
              </Text>
            </>
          )}
        </Box>
        <Text fontFamily='body' fontSize='sm' color='gray.200'>
          {name}
        </Text>
        <MoneyText
          colorType="gray"
          money={maskPrice(price.toString())}
          fontSizeRS="xs"
          fontSizeMoney="md"
        />
      </VStack>
    </TouchableOpacity>
  )
}
