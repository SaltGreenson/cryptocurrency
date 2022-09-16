import * as Yup from 'yup'

export const InputNumberSchema = Yup.object().shape({
    value: Yup.number()
        .min(Math.pow(1, -8), `Value cannot be less than ${Math.pow(1, -8)}`)
        .required()
})