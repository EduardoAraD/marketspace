import { TouchableOpacity } from "react-native";
import { HStack, Heading, IModalProps, Modal, Switch, Text, VStack, useTheme } from "native-base";
import { X } from 'phosphor-react-native';

import { CheckboxLabel } from "./CheckBoxLabel";
import { MiniCardOption } from "./MiniCardOption";
import { Button } from "./Button";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

type ConditionOptions = 'new' | 'use' | '';
export type IFilterProps = {
  condition: ConditionOptions,
  acceptChange: boolean,
  pagament: {
    boleto: boolean;
    pix: boolean;
    money: boolean;
    cardCredit: boolean;
    depositBank: boolean;
  }
}

type ModalFilterAdsProps = IModalProps & {
  filter: IFilterProps;
  updateFilter: (filter: IFilterProps) => void;
}

export function ModalFilterAds({
  filter,
  updateFilter,
  onClose,
  ...rest
}: ModalFilterAdsProps) {
  const { colors } = useTheme();

  const [condition, setCondition] = useState<ConditionOptions>(filter.condition);
  const [acceptChange, setAcceptChange] = useState(filter.acceptChange);
  const [pagament, setPagament] = useState(filter.pagament);

  function handleUpdateCondition(value: ConditionOptions) {
    if(value === condition) {
      setCondition('');
    } else {
      setCondition(value);
    }
  }

  function handleResetFilter() {
    setCondition('');
    setAcceptChange(false);
    setPagament({
      boleto: false,
      cardCredit: false,
      depositBank: false,
      money: false,
      pix: false,
    })
    updateFilter({
      condition: '',
      acceptChange: false,
      pagament: {
        boleto: false,
        cardCredit: false,
        depositBank: false,
        money: false,
        pix: false,
      }
    });
    onClose();
  }

  function handleOnFilter() {
    const newFilter: IFilterProps = {
      acceptChange,
      condition,
      pagament
    }

    updateFilter(newFilter);
    onClose();
  }

  return (
    <Modal
      animationPreset="slide"
      justifyContent='flex-end'
      onClose={onClose}
      {...rest}
    >
      <VStack bg='gray.600' w='full' px={6} pb={8} pt={9} roundedTop='2xl'>
        <HStack alignItems='center' justifyContent='space-between'>
          <Heading fontFamily='heading' fontSize='xl' color='gray.100'>Filtrar anúncios</Heading>
          <TouchableOpacity style={{ padding: 12 }} onPress={onClose} activeOpacity={0.8}>
            <X size={24} color={colors.gray[400]} />
          </TouchableOpacity>
        </HStack>

        <Text mt={3} mb={3} fontFamily='heading' fontSize='sm' color='gray.200'>
          Condição
        </Text>
        <HStack>
          <MiniCardOption
            isSelected={condition === 'new'}
            title="NOVO"
            onPress={() => handleUpdateCondition('new')}
          />
          <MiniCardOption
            isSelected={condition === 'use'}
            title="USADO"
            onPress={() => handleUpdateCondition('use')}
          />
        </HStack>

        <Text mt={6} mb={3} fontFamily='heading' fontSize='sm' color='gray.200'>
          Aceita troca?
        </Text>
        <Switch
          defaultIsChecked
          offTrackColor="gray.500"
          onTrackColor="lightBlue.500"
          onThumbColor="gray.700"
          offThumbColor="gray.700"
          isChecked={acceptChange}
          onValueChange={() => setAcceptChange(!acceptChange)}
        />

        <Text mt={6} mb={3} fontFamily='heading' fontSize='sm' color='gray.200'>
          Meios de pagamento aceitos
        </Text>
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

        <HStack w='full' mt={16}>
          <Button
            flex={1} mr={3} typeColorButton="DEFAULT"
            title="Resetar filtros"
            onPress={handleResetFilter}
          />
          <Button
            flex={1} typeColorButton="SECUNDARY"
            title="Aplicar filtros"
            onPress={handleOnFilter}
          />
        </HStack>
      </VStack>
    </Modal>
  )
}
