import { Center, Heading, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { AuthNavigatorRouteProps } from "../routes/auth.routes";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";

type FormDataProps = {
  email: string;
  password: string;
}

const signInSchema = Yup.object({
  email: Yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: Yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.')
})

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRouteProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  })

  function handleGoSignUp() {
    navigate("signUp");
  }

  function handleSubmitSignIn(data: FormDataProps) {
    console.log(data);
  }

  return (
    <VStack bg="gray.700" flex={1}>
      <Center bg="gray.600" flex={1} roundedBottom={24} p={12}>
        <Center mb={20}>
          <Logo size={24} />
          <Heading fontSize='xlg' fontFamily='heading' color='gray.100'>
            marketspace
          </Heading>
          <Text fontSize='sm' fontFamily='body' color='gray.300'>
            Seu espaço de compra e venda
          </Text>
        </Center>

        <Center w='full'>
          <Text fontSize='sm' fontFamily='body' color='gray.200' mb={4}>
            Acesse sua conta
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange }}) => (
              <Input
                placeholder='E-mail'
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange }}) => (
              <Input
                placeholder='Senha'
                typeInput="password"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          
          <Button
            mt={4}
            title="Entrar"
            onPress={handleSubmit(handleSubmitSignIn)}
          />
        </Center>
      </Center>

      <Center p={12}>
        <Text>
          Ainda não tem acesso?
        </Text>
        <Button
          mt={4}
          mb={8}
          typeColorButton="SECUNDARY"
          title="Criar uma conta"
          onPress={handleGoSignUp}
        />
      </Center>
    </VStack>
  )
}
