export const setMaxValue = (val: number, decimal: number)
    : { value: number, isBigger: boolean } => {
  const max = 10 ** decimal;
  let isBigger = false;

  let value = val;

  if (Math.abs(value) > max) {
    value = max - 1;
    isBigger = true;
  }

  return {
    value,
    isBigger,
  };
};
export const formatNumberToPrice = (value: number, decimal = 13, fraction = 2) => {
  const maxValue = setMaxValue(value, decimal);
  let fr = fraction;
  if (value < 0.1 && value > 0) {
    fr = 5;
  }

  const formattedValue: string = new Intl.NumberFormat('USD', {
    currency: 'usd',
    style: 'currency',
    maximumFractionDigits: fr,
  }).format(+maxValue.value);

  return maxValue.isBigger ? `+${formattedValue}` : formattedValue;
};

export const formatNumbersToPrettyStyle = (value: number, fraction = 2, decimal = 5)
    : string => {
  const maxValue = setMaxValue(value, decimal);

  const formattedValue: string = new Intl.NumberFormat('USD', {
    maximumFractionDigits: fraction,
    style: 'decimal',
  }).format(maxValue.value);

  return maxValue.isBigger ? `+${formattedValue}` : formattedValue;
};
