import { useState } from "react"
import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Box, HStack, Image, Text, VStack } from "native-base"

import { MoneyText } from "./MoneyText"
import { PhotoUser } from "./PhotoUser"

type CardMiniAd = TouchableOpacityProps & {
  isActiveAd?: boolean;
  // foto do anunciante
  // foto do produto
  // nome
  // preco
  // é usado
}

export function CardMiniAd({ isActiveAd = true, ...rest }: CardMiniAd) {
  const [isUsed, setUsed] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      <VStack w={Dimensions.get('window').width / 2 - 36} mx={2}>
        <Box>
          <Image
            source={{ uri: 'https://github.com/eduardoarad.png' }}
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
            <PhotoUser
              imageProps={{
                source: { uri: 'https://github.com/eduardoarad.png' },
                alt: 'Foto do anunciante'
              }}
              size={6}
              borderWidth={0.25}
              borderColor='gray.700'
            />
            <Box bg={isUsed ? 'gray.200' : 'blue.500'} px={2} py={0.5} rounded='full'>
              <Text fontFamily='heading' fontSize={10} color='white' p={0}>
                {isUsed ? 'USADO' : 'NOVO'}
              </Text>
            </Box>
          </HStack>

          {!isActiveAd && (
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
          Blusa do Ajax
        </Text>
        <MoneyText
          colorType="gray"
          money="120,00"
          fontSizeRS="xs"
          fontSizeMoney="md"
        />
      </VStack>
    </TouchableOpacity>
  )
}
