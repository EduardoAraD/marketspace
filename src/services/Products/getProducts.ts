import { PaymentMethods } from "../../dtos/PaymentMethods";
import { ProductHomeDTO } from "../../dtos/ProductDTO";

import { api } from "../api";

export type FilterProductsServiceProps = {
  isNew?: boolean;
  acceptTrade?: boolean;
  paymentMethods?: PaymentMethods[];
  name?: string;
}

export async function getProductsService({ isNew = undefined, acceptTrade = undefined, name = '', paymentMethods = [] }: FilterProductsServiceProps): Promise<ProductHomeDTO[]> {
  try {
    let url = '/products';
    let isFirst = true;

    if(isNew !== undefined) {
      if(isFirst) {
        url = `${url}?is_new=${isNew}`;
        isFirst = false;
      }
    }
    if(acceptTrade !== undefined) {
      const acceptTradeUrl = `accept_trade=${acceptTrade}`;
      if(isFirst) {
        url = `${url}?${acceptTradeUrl}`;
      } else {
        url = `${url}&${acceptTradeUrl}`;
      }
    }
    if(name !== '') {
      const nameUrl = `query=${name}`;
      if(isFirst) {
        url = `${url}?${nameUrl}`;
      } else {
        url = `${url}&${nameUrl}`;
      }
    }
    if(paymentMethods.length > 0) {
      const paymentMethodsUrl = paymentMethods.map(
        i => `payment_methods=${i}`
      ).join('&');

      if(isFirst) {
        url = `${url}?${paymentMethodsUrl}`;
      } else {
        url = `${url}&${paymentMethodsUrl}`;
      }
    }

    const { data } = await api.get(url);

    return data;
  } catch (error) {
    throw error;
  }
}
