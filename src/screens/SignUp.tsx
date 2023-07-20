import { useState } from "react";
import { Box, Center, Heading, Text, VStack, ScrollView, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { PencilSimpleLine } from 'phosphor-react-native';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { AuthNavigatorRouteProps } from "../routes/auth.routes";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { PhotoUser } from "../components/PhotoUser";

import { maskPhone } from "../utils/mask";

import defaultAvatarImg from '../assets/defaultAvatar.png';

type FormDataProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
}

type ImagePhotoUserSelected = {
  uri: string;
  type: string;
}

const signUpSchema = Yup.object({
  name: Yup.string().required('Informe o nome'),
  email: Yup.string().required('Informe o e-mail').email('E-mail inválido'),
  phone: Yup.string().required('Informe o telefone'),
  password: Yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: Yup.string().required('Informe a confirmação de senha').
    oneOf([Yup.ref('password')], 'A confirmação da senha não confere.')
})

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRouteProps>();
  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPhotoUser, setIsLoadingPhotoUser] = useState(false);
  const [photoSelected, setPhotoSelected] = useState<ImagePhotoUserSelected>({} as ImagePhotoUserSelected);

  async function handleUserPhotoSelect() {
    try {
      setIsLoadingPhotoUser(true);

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.6,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if(photoSelected.canceled) {
        return;
      }
      if(photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri, { size: true });
        
        if(photoInfo.exists && ((photoInfo.size / 1024 / 1024) * 0.6) > 5) {
          return toast.show({
            title: 'Esssa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop();
        const photoFile: ImagePhotoUserSelected = {
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        };

        setPhotoSelected(photoFile);

        toast.show({
          title: 'Foto adicionada',
          placement: 'top',
          bgColor: 'green.500',
        })
      }
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Erro ao adicionar a foto.',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoadingPhotoUser(false);
    }
  }

  function handleGoSignIn() {
    navigate("signIn");
  }

  function handleSignUpSubmit(data: FormDataProps) {
    console.log(data);
  }

  return (
    <VStack flex={1} bg='gray.600' p={12}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center mt={4}>
          <Logo size={15} />
          <Heading mb={2} fontSize='xl' fontFamily='body' color='gray.100'>
            Boas vindas!
          </Heading>
          <Text textAlign='center' fontSize='sm' fontFamily='heading' color='gray.200'>
            Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
          </Text>
        </Center>

        <VStack mt={8}>
          <Center mb={4}>
            <Box>
              <PhotoUser
                source={photoSelected.uri ?
                  { uri: photoSelected.uri } :
                  defaultAvatarImg
                }
                alt='Foto do usuário'
                isLoading={isLoadingPhotoUser}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleUserPhotoSelect}
              >
                <Center
                  bg='lightBlue.500'
                  h={10} w={10}
                  rounded='full'
                  position='absolute'
                  right={-10}
                  bottom={0}
                >
                  <PencilSimpleLine color="#FFFFFF" size={22} />
                </Center>
              </TouchableOpacity>
            </Box>
          </Center>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange }}) => (
              <Input
                placeholder="Nome"
                autoCorrect={false}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange }}) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize='none'
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value }}) => (
              <Input
                placeholder="Telefone"
                keyboardType="phone-pad"
                onChangeText={text => onChange(maskPhone(text))}
                value={value}
                maxLength={15}
                errorMessage={errors.phone?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange }}) => (
              <Input
                placeholder="Senha"
                typeInput="password"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange }}) => (
              <Input
                placeholder="Confirme a senha"
                typeInput="password"
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            mt={2}
            title="Criar"
            typeColorButton="SECUNDARY"
            onPress={handleSubmit(handleSignUpSubmit)}
          />
        </VStack>

        <Center mt={12} mb={10}>
          <Text fontSize='sm' fontFamily='heading' color='gray.200' mb={4}>Já tem conta?</Text>
          <Button
            title="Ir para login"
            typeColorButton="DEFAULT"
            onPress={handleGoSignIn}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
