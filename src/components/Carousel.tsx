import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { Image, Box, Text, Center, Heading } from "native-base";

type CarouselProps = {
  images: string[];
  isActiveAd?: boolean;
}

export function Carousel({ images, isActiveAd = true }: CarouselProps) {
  const [activeBanner, setActiveBanner] = useState(0);
  const FlatlistRef = useRef<FlatList>(null);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if(viewableItems[0]) {
      setActiveBanner(viewableItems[0].index)
    }
  }

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged
    }
  ])

  useEffect(() => {
    if(!isActiveAd || images.length <= 1) return;
    const timeId = setTimeout(() => {
      const newIndex = activeBanner === images.length - 1 ? 0 : activeBanner + 1;

      FlatlistRef.current?.scrollToIndex({ index: newIndex });
      setActiveBanner(newIndex);
    }, 3000);
    return () => clearTimeout(timeId);
  }, [activeBanner, images.length, isActiveAd])

  return (
    <>
      <FlatList
        ref={FlatlistRef}
        data={images}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            alt="Foto do Produto"
            w={Dimensions.get('screen').width}
            h={280}
            resizeMode="cover"
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        style={{
          maxHeight: 280,
        }}
      />
      <FlatList
        data={images}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <Box
            h={1}
            m={0.5}
            bg={activeBanner === index ? 'gray.100' : 'gray.700'}
            w={Dimensions.get('screen').width / images.length - (0.5 * images.length + 5)}
            rounded='full'
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={{
          alignSelf: 'center',
          marginTop: -8,
          maxHeight: 8,
          opacity: 0.7,
        }}
      />
      {!isActiveAd && (
        <>
          <Box h={280} bg='gray.100' opacity={0.45} mt={-280} />
          <Center h={280} w='full' position='absolute'>
            <Heading fontFamily='heading' fontSize='sm' color='gray.700'>
              ANÚNCIO DESATIVADO
            </Heading>
          </Center>
        </>
      )}
    </>
  )
}
