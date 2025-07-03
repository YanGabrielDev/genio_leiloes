import { api } from '@/lib/api'
import {
  Alert,
  CreateAlertPayload,
  DeleteAlertParams,
  GetAlertDetailsParams,
  UpdateAlertParams,
} from '@/features/auction-alert/services/alert/alert.types'

export const apiUrl = import.meta.env.VITE_API_URL ?? ''

/**
 * Lista todos os alertas do usuário autenticado.
 * @returns {Promise<Alert[]>} Uma promessa que resolve para uma lista de alertas.
 */
const listAlerts = async (): Promise<Alert[]> => {
  const response = await api.get(`${apiUrl}/alertas/`)
  return response.data
}

/**
 * Cria um novo alerta para o usuário autenticado.
 * @param {CreateAlertPayload} data Os dados para criar o novo alerta.
 * @returns {Promise<Alert>} Uma promessa que resolve para o alerta recém-criado.
 */
const createAlert = async (data: CreateAlertPayload): Promise<Alert> => {
  const response = await api.post(`${apiUrl}/alertas/`, data)
  return response.data
}

/**
 * Obtém os detalhes de um alerta específico pelo ID.
 * @param {GetAlertDetailsParams} params O objeto contendo o ID do alerta.
 * @returns {Promise<Alert>} Uma promessa que resolve para os detalhes do alerta.
 */
const getAlertDetails = async ({
  id,
}: GetAlertDetailsParams): Promise<Alert> => {
  const response = await api.get(`${apiUrl}/alertas/${id}/`)
  return response.data
}

/**
 * Atualiza um alerta existente pelo ID.
 * @param {UpdateAlertParams} params O objeto contendo o ID do alerta e os dados para atualização.
 * @returns {Promise<Alert>} Uma promessa que resolve para o alerta atualizado.
 */
const updateAlert = async ({ id, data }: UpdateAlertParams): Promise<Alert> => {
  const response = await api.put(`${apiUrl}/alertas/${id}/`, data)
  return response.data
}

/**
 * Deleta um alerta existente pelo ID.
 * @param {DeleteAlertParams} params O objeto contendo o ID do alerta.
 * @returns {Promise<void>} Uma promessa que resolve quando o alerta é deletado com sucesso.
 */
const deleteAlert = async ({ id }: DeleteAlertParams): Promise<void> => {
  await api.delete(`${apiUrl}/alertas/${id}/`)
}

export default {
  listAlerts,
  createAlert,
  getAlertDetails,
  updateAlert,
  deleteAlert,
}
