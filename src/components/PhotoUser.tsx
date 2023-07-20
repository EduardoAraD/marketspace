import { Box, IImageProps, Image, Skeleton } from "native-base";

type PhotoUserProps = IImageProps & {
  isLoading?: boolean;
}

export function PhotoUser({ isLoading = false, ...rest }: PhotoUserProps) {
  return (
    <Box
      borderWidth={3}
      borderColor='lightBlue.500'
      rounded='full'
      overflow='hidden'
    >
      {isLoading ? (
        <Skeleton h={22} w={22} startColor='gray.500' endColor='lightBlue.500' />
      ) : (
        <Image
          resizeMode="cover"
          size={22}
          {...rest}
        />
      )}
    </Box>
  )
}
