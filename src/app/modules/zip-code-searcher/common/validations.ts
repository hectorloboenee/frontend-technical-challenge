import * as yup from 'yup';

export const validation = yup.object({
    zipCode: yup
        .string()
        .matches(/^\d+$/, 'Only numbers are allowed')
        .min(5)
        .label('Zip Code')
        .transform((value: any, originalValue: any) => {
            return originalValue === '' ? undefined : value;
        })
        .required(),
})