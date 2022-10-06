export const setMaxValue = (value: number, decimal: number): { value: number, isBigger: boolean } => {
    const max = Math.pow(10, decimal)
    let isBigger = false

    if (Math.abs(value) > max) {
        value = max - 1
        isBigger = true
    }

    return {
        value,
        isBigger
    }
}
export const formatNumberToPrice = (value: number, decimal: number = 13, fraction: number = 2) => {
    const maxValue = setMaxValue(value, decimal)
    value = maxValue.value

    if (value < 0.1 && value > 0) {
        fraction = 5
    }

    const formattedValue: string = new Intl.NumberFormat('USD', {
        currency: 'usd',
        style: 'currency',
        maximumFractionDigits: fraction,
    }).format(+value)

    return maxValue.isBigger ? `+${formattedValue}` : formattedValue
}

export const formatNumbersToPrettyStyle = (value: number, fraction: number = 2, decimal: number = 5): string => {
    const maxValue = setMaxValue(value, decimal)
    value = maxValue.value

    const formattedValue: string = new Intl.NumberFormat('USD', {
        maximumFractionDigits: fraction,
        style: 'decimal'
    }).format(value)

    return maxValue.isBigger ? `+${formattedValue}` : formattedValue
}