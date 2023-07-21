import { HStack, IBoxProps, Text, useTheme } from "native-base";

import BankSvg from '../assets/iconBank.svg';
import BoletoSvg from '../assets/iconBoleto.svg';
import CardCreditSvg from '../assets/iconCardCredit.svg';
import MoneySvg from '../assets/iconMoney.svg';
import PixSvg from '../assets/iconPix.svg';

type LabelOptions = 'Depósito Bancário' | 'Boleto' | 'Cartão de Crédito' | 'Dinheiro' | 'Pix'

type IconLabelProps = IBoxProps & {
  label: LabelOptions
}

export function IconLabel({ label, ...rest }: IconLabelProps) {
  const { colors } = useTheme();
  const iconSize = 18;

  function renderIcon () {
    switch (label) {
      case 'Depósito Bancário': return <BankSvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
      case 'Boleto': return <BoletoSvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
      case 'Cartão de Crédito': return <CardCreditSvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
      case 'Dinheiro': return <MoneySvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
      case 'Pix': return <PixSvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
      default: return <PixSvg fill={colors.gray[200]} width={iconSize} height={iconSize} />
    }
  }

  return(
    <HStack alignItems='center' mt={1} {...rest}>
      {renderIcon()}
      <Text ml={2} fontFamily='body' fontSize='sm' color='gray.200'>
        {label}
      </Text>
    </HStack>
  )
}
