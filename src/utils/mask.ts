export function maskDate (date: string) {
  const dateFormated = date.replace(/\D/g,'').slice(0, 10);
  if (dateFormated.length >= 5) {
    return `${dateFormated.slice(0,2)}/${dateFormated.slice(2,4)}/${dateFormated.slice(4)}`;
  }
  else if (dateFormated.length >= 3) {
    return `${dateFormated.slice(0,2)}/${dateFormated.slice(2)}`;
  }
  return dateFormated;
}

export function maskTime(time: string) {
  const timeFormated = time.replace(/\D/g,'').slice(0, 10);
  if (timeFormated.length >= 3) {
    return `${timeFormated.slice(0,2)}:${timeFormated.slice(2)}`;
  }
  return timeFormated;
}

export function maskPhone(phone: string) {
  const phoneFormated = phone.replace(/\D/g,'').slice(0, 11);
  if(phoneFormated.length > 7) {
    return `(${phoneFormated.slice(0,2)}) ${phoneFormated.slice(2,7)}-${phoneFormated.slice(7)}`;
  }
  if(phoneFormated.length >= 3) {
    return `(${phoneFormated.slice(0,2)}) ${phoneFormated.slice(2)}`;
  }
  if(phoneFormated.length > 0 && phoneFormated.length <= 2) {
    return `(${phoneFormated}`;
  }

  return phoneFormated;
}

export function maskPrice(price: string) {
  const priceFormat = price.replace('.', '').replace(',', '').replace(/\D/g, '')

  const options = { minimumFractionDigits: 2 }
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(priceFormat) / 100
  )

  return result
}
