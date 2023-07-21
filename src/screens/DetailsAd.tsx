import { HStack, ScrollView, VStack } from "native-base";

import { Button } from "../components/Button";
import { DetailsAdComponent } from "../components/DetailsAdComponent";
import { Header } from "../components/Header";
import { MoneyText } from "../components/MoneyText";

export function DetailsAd() {
  const images = [
    'https://github.com/eduardoArad.png',
    'https://github.com/eduardoarad.png',
    'https://github.com/eduardoarad.png',
  ]

  return (
    <VStack flex={1} bg='gray.600'>
      <Header showIconBack />

      <ScrollView>
        <DetailsAdComponent images={images} />
      </ScrollView>

      <HStack bg='gray.700' px={6} pt={5} pb={7} alignItems='center'>
        <MoneyText
          flex={1}
          money="120,00"
          fontSizeRS="sm"
          fontSizeMoney="xl"
        />
        <Button
          icon='phone-call'
          flex={1}
          title="Entrar em contato"
        />
      </HStack>
    </VStack>
  )
}
