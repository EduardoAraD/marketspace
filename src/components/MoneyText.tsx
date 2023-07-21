import { HStack, Heading, IBoxProps } from "native-base";

type MoneyText = IBoxProps & {
  money: string;
  colorType?: 'gray' | 'blue';
  fontSizeRS?:  'xs'|'sm'|'md'|'xl'|'xlg',
  fontSizeMoney?: 'xs'|'sm'|'md'|'xl'|'xlg'
}

export function MoneyText({ money, colorType = 'blue', fontSizeRS = 'sm', fontSizeMoney = 'xl', ...rest }: MoneyText) {
  return (
    <HStack alignItems='flex-end' {...rest}>
      <Heading
        mr={0.5}
        fontFamily='heading'
        fontSize={fontSizeRS}
        color={colorType === 'blue' ? 'lightBlue.500' : 'gray.100'}
      >
        R$
      </Heading>
      <Heading
        fontFamily='heading'
        fontSize={fontSizeMoney}
        color={colorType === 'blue' ? 'lightBlue.500' : 'gray.100'}>
        {money}
      </Heading>
    </HStack>
  )
}
