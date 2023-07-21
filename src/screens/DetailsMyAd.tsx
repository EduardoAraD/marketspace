import { ScrollView, VStack } from "native-base";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { DetailsAdComponent } from "../components/DetailsAdComponent";

export function DetailsMyAd(){
  const isActiveAd = false;

  return (
    <VStack flex={1} bg='gray.600'>
      <Header showIconBack showIcon="edit" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DetailsAdComponent
          images={['https://github.com/eduardoarad.png']}
          isActiveAd={isActiveAd}
        />
        <VStack px={6} pb={10} pt={2}>
          {isActiveAd ? (
            <Button
              title="Desativar anúncio"
              icon='power'
              typeColorButton="SECUNDARY"
            />
          ) : (
            <Button
              title="Reativar anúncio"
              icon='power'
            />
          )}
          <Button
            mt={2}
            title="Excluir anúncio"
            icon='trash'
            typeColorButton="DEFAULT"
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}