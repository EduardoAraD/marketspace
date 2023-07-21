import { Box, HStack, Heading, ScrollView, Text, VStack } from "native-base";

import { Button } from "../components/Button";
import { Carousel } from "../components/Carousel";
import { Header } from "../components/Header";
import { IconLabel } from "../components/IconLabel";
import { MoneyText } from "../components/MoneyText";
import { PhotoUser } from "../components/PhotoUser";

export function DetailsAd() {
  const images = [
    'https://github.com/eduardoArad.png',
    'https://github.com/eduardoarad.png',
    'https://github.com/eduardoarad.png',
  ]

  return (
    <VStack flex={1}>
      <Header showIconBack />

      <ScrollView>
        <Carousel images={images} />
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
      </ScrollView>

      <HStack bg='gray.700' px={6} pt={5} pb={7} alignItems='center'>
        <MoneyText
          flex={1}
          money="120,00"
          fontSizeRS="sm"
          fontSizeMoney="xl"
        />
        <Button
          icon='phone-call'
          flex={1}
          title="Entrar em contato"
        />
      </HStack>
    </VStack>
  )
}
