import { IImageProps, Image } from "native-base";

import logoImg from '../assets/logo.png';

type LogoProps = IImageProps & {
  size: number;
}

export function Logo ({ size, ...rest }: LogoProps) {
  return (
    <Image
      source={logoImg}
      alt="logo MarketSpace"
      size={size}
      resizeMode="contain"
      {...rest}
    />
  )
}