import { Checkbox, ICheckboxProps, Text } from "native-base";

type CheckboxLabelProps = ICheckboxProps & {
  title: string;
}

export function CheckboxLabel({ title, ...rest }: CheckboxLabelProps) {
  return (
    <Checkbox
      borderColor='gray.400'
      color='lightBlue.500'
      _checked={{ bgColor: 'lightBlue.500', borderColor: 'lightBlue.500' }}
      {...rest}
    >
      <Text fontFamily='body' fontSize='md' color='gray.200'>{title}</Text>
    </Checkbox>
  )
}
