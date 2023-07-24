import { Center, Image, Skeleton, useTheme } from "native-base";
import { Plus, X } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type TouchNewImage = TouchableOpacityProps & {
  imageUri?: string | null;
  isLoading?: boolean;
}

export function TouchNewImage({ imageUri, isLoading = false, ...rest }: TouchNewImage) {
  const size = 100;
  const { colors } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      {isLoading ? (
        <Skeleton
          h={size}
          w={size}
          startColor='gray.500'
          endColor='lightBlue.500'
          rounded='xl'
        />
      ): imageUri ? (
        <>
          <Image
            source={{ uri: imageUri }}
            alt="Foto do anúncio"
            h={size}
            w={size}
            rounded='xl'
          />
          <Center h={4} w={4} bg='gray.200' rounded='full' position='absolute' m={2} right={0}>
            <X size={14} color={colors.gray[700]} />
          </Center>
        </>
      ) : (
        <Center h={size} w={size} bg='gray.500' rounded='xl'>
          <Plus size={24} color={colors.gray[400]} />
        </Center>
      )}
    </TouchableOpacity>
  )
}
