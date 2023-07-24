import { HStack, Heading, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../hooks/useAuth";

import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { api } from "../services/api";

import { Button } from "./Button";
import { PhotoUser } from "./PhotoUser";

import defaultAvatarImg from '../assets/defaultAvatar.png';

export function HeaderHome() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { user } = useAuth();

  function handleGoCreateAd() {
    navigate('createAd');
  }

  return (
    <HStack w='full'>
      <HStack flex={9} alignItems='center'>
        <PhotoUser
          imageProps={{
            source: user.avatar ?
              { uri: `${api.defaults.baseURL}/images/${user.avatar}` } :
              defaultAvatarImg,
            alt: 'Foto do usuário',
          }}
          size={12}
        />
        <VStack flex={1} ml={2}>
          <Text fontFamily='body' fontSize='md' color='gray.100'>
            Boas vindas,
          </Text>
          <Heading fontFamily='heading' fontSize='md' color='gray.100' numberOfLines={1}>
            {user.name}!
          </Heading>
        </VStack>
      </HStack>
      <Button
        ml={2}
        title="Criar anúncio"
        icon='plus'
        flex={7}
        typeColorButton="SECUNDARY"
        onPress={handleGoCreateAd}
      />
    </HStack>
  )
}
