import { Center, IBoxProps, Spinner } from "native-base";

export function Loading({ ...rest }: IBoxProps) {
  return (
    <Center flex={1} {...rest}>
      <Spinner />
    </Center>
  )
}
