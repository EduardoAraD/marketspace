import { Box, HStack, Heading, Image, Text, VStack } from "native-base"

import { PhotoUser } from "./PhotoUser"
import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { useState } from "react"

type CardMiniAd = TouchableOpacityProps & {
  // foto do anunciante
  // foto do produto
  // nome
  // preco
  // é usado
}

export function CardMiniAd() {
  const [isUsed, setUsed] = useState(false);

  return (
    <TouchableOpacity>
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
              <Text fontFamily='body' fontSize={10} color='white' p={0}>
                {isUsed ? 'USADO' : 'NOVO'}
              </Text>
            </Box>
          </HStack>
          
        </Box>
        <Text fontFamily='heading' fontSize='sm' color='gray.200'>
          Blusa do Ajax
          </Text>
        <HStack alignItems='flex-end'>
          <Heading fontFamily='body' fontSize='xs' color='gray.100' mr={1}>
            R$
          </Heading>
          <Heading fontFamily='body' fontSize='md' color='gray.100'>
            102,00
          </Heading>
        </HStack>
      </VStack>
    </TouchableOpacity>
  )
}
