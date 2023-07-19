import { Center, Spinner, Text } from "native-base";

export function Loading() {
  return (
    <Center flex={1}>
      <Spinner />
      <Text>Carregando ...</Text>
    </Center>
  )
}
