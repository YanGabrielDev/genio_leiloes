import { useState } from 'react'
import { AlertFormData } from '../types'
import { CreateAlertPayload } from '../services/alert'

export const useAlertForm = (initialData?: Partial<AlertFormData>) => {
  const [formData, setFormData] = useState<AlertFormData>({
    momento_alerta: initialData?.momento_alerta || 'antes',
    valor_referencia: initialData?.valor_referencia || '',
    marca_modelo: initialData?.marca_modelo || '',
    ano_de: initialData?.ano_de || '',
    ano_ate: initialData?.ano_ate || '',
    cor: initialData?.cor || '',
    contato: initialData?.contato || '',
    alerta_global: initialData?.alerta_global || false,
    enviar_uma_vez: initialData?.enviar_uma_vez || false,
  })

  const updateFormData = (field: keyof AlertFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const parseCurrencyToNumber = (value: string): number => {
    const num = Number(value.replace(/\D/g, '')) / 100
    return isNaN(num) ? 0 : num
  }

  const formatCurrency = (value: string): string => {
    const num = parseCurrencyToNumber(value)
    return num.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const prepareSubmitData = (): CreateAlertPayload => {
    return {
      momento_alerta: formData.momento_alerta,
      valor_referencia: parseCurrencyToNumber(formData.valor_referencia),
      marca_modelo: formData.marca_modelo,
      ano_de: parseInt(formData.ano_de) || 0,
      ano_ate: parseInt(formData.ano_ate) || 0,
      cor: formData.cor,
      contato: formData.contato,
      alerta_global: formData.alerta_global,
      enviar_uma_vez: formData.enviar_uma_vez,
    }
  }

  const resetForm = () => {
    setFormData({
      momento_alerta: 'antes',
      valor_referencia: '',
      marca_modelo: '',
      ano_de: '',
      ano_ate: '',
      cor: '',
      contato: '',
      alerta_global: false,
      enviar_uma_vez: false,
    })
  }

  return {
    formData,
    updateFormData,
    formatCurrency,
    prepareSubmitData,
    resetForm,
  }
}
