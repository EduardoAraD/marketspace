import { HStack, Heading, Skeleton, VStack, useTheme } from "native-base";

export function LoadingDetailsAd() {
  const { colors } = useTheme();

  const startColor = colors.gray[500];
  const endColor = colors.gray[400];

  return (
    <VStack>
      <Skeleton h={280} w='full' startColor={startColor} endColor={endColor} />
      <VStack p={6}>
        <HStack alignItems='center'>
          <Skeleton h={6} w={6} startColor={startColor} endColor={endColor} rounded='full' />
          <Skeleton.Text ml={2} startColor={startColor} endColor={endColor} lines={1} w={200} />
        </HStack>
        <Skeleton
          mt={5}
          px={2}
          h={5}
          w={12}
          rounded='full'
          startColor={startColor} endColor={endColor}
        />
        <HStack mt={5} justifyContent='space-between'>
          <Skeleton h={5} w={40} startColor={startColor} endColor={endColor} />
          <HStack alignItems='flex-end'>
            <Heading
              mr={0.5}
              fontFamily='heading'
              fontSize='sm'
              color={'lightBlue.500'}
            >
              R$
            </Heading>
            <Skeleton h={5} w={12} startColor={startColor} endColor={endColor}/>
          </HStack>
        </HStack>
        <Skeleton.Text mt={4} lineHeight={8} lines={5} startColor={startColor} endColor={endColor} />
        <HStack mt={6} alignItems='center'>
          <Heading mr={2} fontFamily='heading' fontSize='sm' color='gray.200'>
            Aceita troca?
          </Heading>
          <Skeleton.Text w={10} lines={1} startColor={startColor} endColor={endColor}/>
        </HStack>

        <Heading mt={4} mb={1} fontFamily='heading' fontSize='sm' color='gray.200'>
          Pagamentos
        </Heading>
        <Skeleton mt={3} w={240} h={20} startColor={startColor} endColor={endColor} />
      </VStack>
    </VStack>
  )
}
