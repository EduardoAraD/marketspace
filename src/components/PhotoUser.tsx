import { Box, IImageProps, Image } from "native-base";

export function PhotoUser({ ...rest }: IImageProps) {
  return (
    <Box
      borderWidth={3}
      borderColor='lightBlue.500'
      rounded='full'
      overflow='hidden'
    >
      <Image
        resizeMode="contain"
        size={22}
        {...rest}
      />
    </Box>
  )
}
