import { useState } from "react";
import { VStack, Select, HStack, Text, useTheme, FlatList, Box } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { CaretUp, CaretDown } from "phosphor-react-native";

import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { CardMiniAd } from "../components/CardMiniAd";
import { FooterTabNavigation } from "../components/FooterTabNavigation";
import { Header } from "../components/Header";

export function MyAds() {
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  const [service, setService] = useState("all");
  const [ads, setAds] = useState<string[]>(['1', '2', '3', '4', '5']);

  function handleGoCreateAd() {
    navigate('createAd');
  }

  function handleGoDetailsAd() {
    navigate("detailsMyAd");
  }

  return (
    <VStack flex={1} bg='gray.600'>
      <Header
        title="Meus anúncios"
        showIcon="plus"
        onPressIconEditOrPlus={handleGoCreateAd}
      />
      <VStack flex={1}>
        <HStack p={6} pb={2} justifyContent='space-between' alignItems='center'>
          <Text fontFamily='body' fontSize='sm' color='gray.200'>9 anúncios</Text>
          <Select
            selectedValue={service}
            onValueChange={itemValue => setService(itemValue)}
            minW={120}
            fontFamily='body'
            fontSize='sm'
            color='gray.100'
            borderColor='gray.500'
            dropdownOpenIcon={<CaretUp weight="bold" size={16} color={colors.gray[300]} />}
            dropdownCloseIcon={<CaretDown weight="bold" size={16} color={colors.gray[300]} />}
          >
            <Select.Item label="Todos" value="all" _text={{
              color: 'gray.200',
              fontFamily: service === 'all' ? 'heading' : 'body',
              fontSize: 'md'
            }}/>
            <Select.Item label="Ativos" value="active" _text={{
              color: 'gray.200',
              fontFamily: service === 'active' ? 'heading' : 'body',
              fontSize: 'md'
            }} />
            <Select.Item label="Inativos" value="inactive" _text={{
              color: 'gray.200',
              fontFamily: service === 'inactive' ? 'heading' : 'body',
              fontSize: 'md'
            }} />
          </Select>
        </HStack>

        <FlatList
          data={ads}
          keyExtractor={item => item}
          renderItem={({ item, index }) => (
            <CardMiniAd onPress={handleGoDetailsAd} isActiveAd={index !== 2} />
          )}
          _contentContainerStyle={{ pb: 10, pt: 3, alignSelf: 'center' }}
          contentContainerStyle={ads.length === 0 && {flex: 1, justifyContent: 'center'}}
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {'\n'}
              Vamos fazer exercícios hoje?
            </Text>
          )}
          ItemSeparatorComponent={() => <Box h={6} w={5} />}
          numColumns={2}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </VStack>
      <FooterTabNavigation selected="myAds" />
    </VStack>
  )
}
