import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HStack, Heading, ScrollView, Switch, Text, VStack, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { Button } from "../components/Button";
import { CheckboxLabel } from "../components/CheckBoxLabel";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { RadioLabel } from "../components/RadioLabel";
import { TouchNewImage } from "../components/TouchNewImage";

import { PaymentMethods } from "../dtos/PaymentMethods";
import { PhotoDTO } from "../dtos/PhotoDTO";
import { ProductCompleteDTO } from "../dtos/ProductDTO";

import { api } from "../services/api";

import { AppError } from "../utils/AppError";
import { maskPrice } from "../utils/mask";

type ImagePhotoAdSelected = {
  uri: string;
  type: string;
}

type MeansPaygament = {
  boleto: boolean;
  pix: boolean;
  money: boolean;
  cardCredit: boolean;
  depositBank: boolean;
}

type FormDataProps = {
  title: string,
  description: string,
  price: string,
}

export type CreateAdRoutes = {
  isNew: boolean;
  product: ProductCompleteDTO;
}

const signUpSchema = Yup.object({
  title: Yup.string().required('Informe o título do anúncio'),
  description: Yup.string().required('Informe a descriçao do anúncio'),
  price: Yup.string().required('Informe o valor do produto').min(3, 'É necessário ter essa formatação de preço 0,00'),
})

export function CreateAd() {
  const { isNew, product } = useRoute().params as CreateAdRoutes;
  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  
  const [photosAd, setPhotosAd] = useState<ImagePhotoAdSelected[]>([]);
  const [isLoadingPhotoAd, setIsLoadingPhotoAd] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState<'new' | 'used'>('new');
  const [acceptChange, setAcceptChange] = useState(false);
  const [pagament, setPagament] = useState<MeansPaygament>({
    boleto: false,
    cardCredit: false,
    depositBank: false,
    money: false,
    pix: false,
  });

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      description: isNew ? '' : product.description,
      price: isNew ? '0' : maskPrice(String(product.price)),
      title: isNew ? '' : product.name,
    }
  });

  async function handleUserPhotoSelect() {
    try {
      setIsLoadingPhotoAd(true);

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
          throw new AppError('Esssa imagem é muito grande. Escolha uma de até 5MB.')
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop();

        const photoFile: ImagePhotoAdSelected = {
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        };

        setPhotosAd(state => [...state, photoFile]);

        toast.show({
          title: 'Foto adicionada',
          placement: 'top',
          bgColor: 'green.500',
          duration: 2000,
        })
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Erro ao adicionar a foto.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        duration: 2000,
      })
    } finally {
      setIsLoadingPhotoAd(false);
    }
  }

  function handleRemovePhoto (index: number) {
    setPhotosAd(state => [...state.filter((photo, indexPhoto) => indexPhoto !== index)])
  }

  function handleSubmitCreate(data: FormDataProps){
    try {
      if(photosAd.length === 0){
        throw new AppError('Adicione as fotos do anúncio.')
      }
      if(!pagament.boleto && !pagament.cardCredit && !pagament.depositBank && !pagament.money && !pagament.pix) {
        throw new AppError('Adicione os meios de pagamento.')
      }

      let payment_methods: PaymentMethods[] = [];
      if(pagament.boleto) {
        payment_methods.push('boleto')
      }
      if(pagament.cardCredit) {
        payment_methods.push('card')
      }
      if(pagament.depositBank) {
        payment_methods.push('deposit')
      }
      if(pagament.money) {
        payment_methods.push('cash')
      }
      if(pagament.pix) {
        payment_methods.push('pix')
      }
      const price = parseInt(data.price.replace('.', '').replace(',', '').replace(/\D/g, ''), 10)
      const photos: PhotoDTO[] = photosAd.map(({ type, uri }, index) => ({
        name: `${data.title}-${index}.${type.split('/')[1]}`.replace(/\s/g, ''),
        type,
        uri,
      }))
  
      navigate("previewAd", {
        idProduct: isNew ? '' : product.id,
        photos: photos,
        photosOld: product?.product_images ?? [],
        product: {
          name: data.title.trim(),
          accept_trade: acceptChange,
          description: data.description.trim(),
          is_new: isNewProduct === 'new',
          payment_methods,
          price,
        }
      })
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Erro em avançar anúncio.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        duration: 2000,
      })
    }
  }

  function handleCancelCreateAd() {
    goBack();
  }

  useEffect(() => {
    if(!isNew) {
      setAcceptChange(product.accept_trade);
      setIsNewProduct(product.is_new ? 'new' : 'used');
      setPagament({
        boleto: !!product.payment_methods.find(item => item.key === 'boleto'),
        cardCredit: !!product.payment_methods.find(item => item.key === 'card'),
        depositBank: !!product.payment_methods.find(item => item.key === 'deposit'),
        money: !!product.payment_methods.find(item => item.key === 'cash'),
        pix: !!product.payment_methods.find(item => item.key === 'pix')
      });
      setPhotosAd(product.product_images.map(image => ({
        type: '',
        uri: `${api.defaults.baseURL}/images/${image.path}`
      })))
    }
  }, []);

  return (
    <VStack flex={1} bg='gray.600'>
      <Header showIconBack title={isNew ? 'Criar anúncio' : 'Editar anúncio'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack p={6}>
          <Heading fontFamily='heading' fontSize='md' color='gray.200'>
            Imagens
          </Heading>
          <Text fontFamily='body' fontSize='sm' color='gray.200'>
            Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
          </Text>
          <HStack mt={4} justifyContent={photosAd.length <= 1 ? 'flex-start' : 'space-between'}>
            {photosAd.map((photo, index) => (
              <TouchNewImage
                key={`${photo.uri}-${index}`}
                imageUri={photo.uri}
                onPress={() => handleRemovePhoto(index)}
              />
            ))}
            {photosAd.length <= 2 && (
              <TouchNewImage
                style={{ marginLeft: photosAd.length === 1 ? 20 : 0 }}
                onPress={handleUserPhotoSelect}
                isLoading={isLoadingPhotoAd}
              />
            )}
          </HStack>

          <Heading mt={8} fontFamily='heading' fontSize='md' color='gray.200'>
            Sobre o produto
          </Heading>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value }}) => (
              <Input
                mt={4}
                placeholder="Título do anúncio"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value }}) => (
              <Input
                placeholder="Decrição do produto"
                h={40}
                multiline
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title?.message}
              />
            )}
          />

          <HStack>
            <RadioLabel
              onPress={() => setIsNewProduct('new')}
              title="Produto novo"
              value={isNewProduct === 'new'}
            />
            <RadioLabel
              ml={5}
              onPress={() => setIsNewProduct('used')}
              title="Produto usado"
              value={isNewProduct === 'used'}
            />
          </HStack>

          <Heading mt={8} mb={4} fontFamily='heading' fontSize='md' color='gray.200'>
            Venda
          </Heading>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                leftElement={
                  <Text fontFamily='body' fontSize='md' color='gray.100' mr={-2} ml={4}>
                    R$
                  </Text>
                }
                placeholder="Valor do produto"
                keyboardType='numeric'
                value={value}
                onChangeText={text => onChange(maskPrice(text))}
                errorMessage={errors.price?.message}
              />
            )}
          />
          
          
          <Heading mt={4} mb={2} fontFamily='heading' fontSize='md' color='gray.200'>
            Aceita troca?
          </Heading>
          <Switch
            defaultIsChecked
            offTrackColor="gray.500"
            onTrackColor="lightBlue.500"
            onThumbColor="gray.700"
            offThumbColor="gray.700"
            isChecked={acceptChange}
            onValueChange={() => setAcceptChange(!acceptChange)}
          />
          
          <Heading mt={8} fontFamily='heading' fontSize='md' color='gray.200'>
            Meios de pagamento
          </Heading>
          <CheckboxLabel
            value="1"
            isChecked={pagament.boleto}
            onChange={() => setPagament(state => ({ ...state, boleto: !pagament.boleto }))}
            title="Boleto"
          />
          <CheckboxLabel
            value="1"
            isChecked={pagament.pix}
            onChange={() => setPagament(state => ({ ...state, pix: !pagament.pix }))}
            title="Pix"
          />
          <CheckboxLabel
            value="1"
            isChecked={pagament.money}
            onChange={() => setPagament(state => ({ ...state, money: !pagament.money }))}
            title="Dinheiro"
          />
          <CheckboxLabel
            value="1"
            isChecked={pagament.cardCredit}
            onChange={() => setPagament(state => ({ ...state, cardCredit: !pagament.cardCredit }))}
            title="Cartão de crédito"
          />
          <CheckboxLabel
            value="1"
            isChecked={pagament.depositBank}
            onChange={() => setPagament(state => ({ ...state, depositBank: !pagament.depositBank }))}
            title="Deposito bancário"
          />

        </VStack>
      </ScrollView>
      <HStack bg='gray.700' px={6} pt={5} pb={8} alignItems='center'>
        <Button
          flex={1}
          title="Cancelar"
          typeColorButton="DEFAULT"
          mr={3}
          onPress={handleCancelCreateAd}
        />
        <Button
          flex={1}
          title="Avançar"
          typeColorButton="SECUNDARY"
          onPress={handleSubmit(handleSubmitCreate)}
        />
      </HStack>
    </VStack>
  )
}
