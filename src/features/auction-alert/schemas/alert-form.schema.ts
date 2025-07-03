import { z } from 'zod'

const currencyRegex = /^\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/

export const alertFormSchema = z
  .object({
    momento_alerta: z.enum(['antes', 'exato', 'depois']),
    valor_referencia: z.string().min(1, 'Valor é obrigatório'),
    //   .refine((val) => currencyRegex.test(val), 'Valor monetário inválido'),
    marca_modelo: z.string().min(3, 'Mínimo 3 caracteres'),
    ano_de: z
      .string()
      .min(1, 'Ano é obrigatório')
      .refine((val) => {
        const year = parseInt(val)
        return year >= 1900 && year <= new Date().getFullYear()
      }, 'Ano inválido'),
    ano_ate: z
      .string()
      .min(1, 'Ano é obrigatório')
      .refine((val) => {
        const year = parseInt(val)
        return year >= 1900 && year <= new Date().getFullYear()
      }, 'Ano inválido'),
    cor: z.string().min(1, 'Selecione uma cor'),
    contato: z
      .string()
      .min(1, 'Contato é obrigatório')
      .refine((val) => {
        // Validate email or phone number
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
        const isPhone =
          /^(\+\d{1,3})?\s?\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/.test(val)
        return isEmail || isPhone
      }, 'Informe um e-mail ou telefone válido'),
    alerta_global: z.boolean(),
    enviar_uma_vez: z.boolean(),
  })
  .refine(
    (data) => {
      // Validate year range
      const yearFrom = parseInt(data.ano_de)
      const yearTo = parseInt(data.ano_ate)
      return yearTo >= yearFrom
    },
    {
      message: 'Ano final deve ser maior ou igual ao inicial',
      path: ['ano_ate'],
    }
  )

export type AlertFormValues = z.infer<typeof alertFormSchema>
