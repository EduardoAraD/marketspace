import { HStack, IBoxProps, Text, useTheme } from "native-base";

import { PaymentMethods } from "../dtos/PaymentMethods";

import BankSvg from '../assets/iconBank.svg';
import BoletoSvg from '../assets/iconBoleto.svg';
import CardCreditSvg from '../assets/iconCardCredit.svg';
import MoneySvg from '../assets/iconMoney.svg';
import PixSvg from '../assets/iconPix.svg';

type IconLabelProps = IBoxProps & {
  payment_methods: PaymentMethods
}

export function IconLabel({ payment_methods, ...rest }: IconLabelProps) {
  const { colors } = useTheme();
  const iconSize = 18;

  function renderIcon () {
    switch (payment_methods) {
      case 'deposit': return <BankSvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
      case 'boleto': return <BoletoSvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
      case 'card': return <CardCreditSvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
      case 'cash': return <MoneySvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
      case 'pix': return <PixSvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
      default: return <PixSvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
    }
  }

  function renderText(): string {
    switch(payment_methods){
      case 'boleto': return 'Boleto'
      case 'card': return 'Cartão de Crédito'
      case 'cash': return 'Dinheiro'
      case 'deposit': return 'Depósito Bancário'
      case 'pix': return 'Pix'
    }
  }

  return(
    <HStack alignItems='center' mt={1} {...rest}>
      {renderIcon()}
      <Text ml={2} fontFamily='body' fontSize='sm' color='gray.200'>
        {renderText()}
      </Text>
    </HStack>
  )
}
