export type PaymentMethods = 'pix' | 'card' | 'boleto' | 'cash' | 'deposit';
export type PaymentMethodsName = 'Boleto' | 'Cartão de Crédito' | 'Dinheiro' | 'Depósito Bancário' | 'Pix';

export type PaymentMethodsDTO = {
  key: PaymentMethods;
  name: PaymentMethodsName
}
