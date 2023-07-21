import { Box, HStack, Heading, Text, VStack } from "native-base";

import { Carousel } from "./Carousel";
import { IconLabel } from "./IconLabel";
import { MoneyText } from "./MoneyText";
import { PhotoUser } from "./PhotoUser";

type DetailsAdProps = {
  images: string[];
  isActiveAd?: boolean;
}

export function DetailsAdComponent({ images, isActiveAd = true }: DetailsAdProps) {
  return (
    <>
      <Carousel images={images} isActiveAd={isActiveAd} />
      <VStack p={6}>
        <HStack alignItems='center'>
          <PhotoUser
            imageProps={{
              source: { uri: 'https://github.com/eduardoarad.png' },
              alt: 'Foto do anunciante'
            }}
            size={6}
          />
          <Text ml={2} fontFamily='body' fontSize='sm' color='gray.100'>Eduardo Araujo</Text>
        </HStack>
        <Box mt={5} px={2} bg='gray.500' alignSelf='flex-start' rounded='full'>
          <Heading fontFamily='heading' fontSize='xs' color='gray.200'>NOVO</Heading>
        </Box>
        <HStack mt={2} justifyContent='space-between'>
          <Heading fontFamily='heading' fontSize='xl' color='gray.100'>Bicicleta</Heading>
          <MoneyText
            money="120,00"
            fontSizeRS="sm"
            fontSizeMoney="xl"
          />
        </HStack>
        <Text mt={2} fontFamily='body' fontSize='sm' color='gray.200'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed cumque quaerat quia maxime necessitatibus, neque quasi pariatur perspiciatis. Iste architecto molestias voluptates excepturi dolor eveniet dolorem ad pariatur, maxime adipisci.
        </Text>
        <HStack mt={6} alignItems='center'>
          <Heading mr={2} fontFamily='heading' fontSize='sm' color='gray.200'>Aceita troca?</Heading>
          <Text fontFamily='body' fontSize='sm' color='gray.200'>Sim</Text>
        </HStack>

        <Heading mt={4} mb={1} fontFamily='heading' fontSize='sm' color='gray.200'>
          Pagamentos
        </Heading>
        <IconLabel label="Boleto" />
        <IconLabel label="Depósito Bancário" />
        <IconLabel label="Cartão de Crédito" />
        <IconLabel label="Dinheiro" />
        <IconLabel label="Pix" />
      </VStack>
    </>
  )
}
