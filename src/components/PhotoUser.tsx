import { Box, IImageProps, Image, Skeleton, IBoxProps } from "native-base";

type PhotoUserProps = IBoxProps & {
  isLoading?: boolean;
  size?: number;
  imageProps?: IImageProps
}

export function PhotoUser({ isLoading = false, imageProps, size, ...rest }: PhotoUserProps) {
  return (
    <Box
      borderWidth={3}
      borderColor='lightBlue.500'
      rounded='full'
      overflow='hidden'
      {...rest}
    >
      {isLoading ? (
        <Skeleton h={size} w={size} startColor='gray.500' endColor='lightBlue.500' />
      ) : (
        <Image
          resizeMode="cover"
          size={size}
          {...imageProps}
        />
      )}
    </Box>
  )
}
