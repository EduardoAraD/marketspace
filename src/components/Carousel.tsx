import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { Image, Box } from "native-base";

type CarouselProps = {
  images: string[];
}

export function Carousel({ images }: CarouselProps) {
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
    const timeId = setTimeout(() => {
      const newIndex = activeBanner === images.length - 1 ? 0 : activeBanner + 1;

      FlatlistRef.current?.scrollToIndex({ index: newIndex });
      setActiveBanner(newIndex);
    }, 3000);
    return () => clearTimeout(timeId);
  }, [activeBanner, images.length])

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
    </>
  )
}