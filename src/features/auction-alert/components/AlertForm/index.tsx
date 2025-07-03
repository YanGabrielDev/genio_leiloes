import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ConditionRadioGroup } from '../ConditionRadioGroup'
import { ColorSelect } from '../ColorSelect'
import { YearRangeInput } from '../YearRangeInput'
import { AlertFormData } from '../../types'

interface AlertFormProps {
  formData: AlertFormData
  onFormChange: (field: keyof AlertFormData, value: any) => void
  onCurrencyBlur: (value: string) => string
  onSubmit: (e: React.FormEvent) => void
  isSubmitting?: boolean
}

export const AlertForm = ({
  formData,
  onFormChange,
  onCurrencyBlur,
  onSubmit,
  isSubmitting = false,
}: AlertFormProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
  >
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
      Criar Alerta Personalizado
    </h2>

    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            1. Deseja receber o alerta quando?
          </Label>
          <ConditionRadioGroup
            value={formData.momento_alerta}
            onChange={(value) => onFormChange('momento_alerta', value)}
          />
        </div>

        <div>
          <Label
            htmlFor="valor_referencia"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            2. Valor de referência para o alerta (R$):
          </Label>
          <Input
            id="valor_referencia"
            type="text"
            value={formData.valor_referencia}
            onChange={(e) => onFormChange('valor_referencia', e.target.value)}
            onBlur={() => {
              if (formData.valor_referencia) {
                onFormChange(
                  'valor_referencia',
                  onCurrencyBlur(formData.valor_referencia)
                )
              }
            }}
            placeholder="Exemplo: 15000"
            className="w-full"
          />
        </div>

        <div>
          <Label
            htmlFor="marca_modelo"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            3. Marca e Modelo:
          </Label>
          <Input
            id="marca_modelo"
            type="text"
            value={formData.marca_modelo}
            onChange={(e) => onFormChange('marca_modelo', e.target.value)}
            placeholder="Exemplo: Volkswagen Gol"
            className="w-full"
          />
        </div>

        <YearRangeInput
          yearFrom={formData.ano_de}
          yearTo={formData.ano_ate}
          onYearFromChange={(value) => onFormChange('ano_de', value)}
          onYearToChange={(value) => onFormChange('ano_ate', value)}
        />

        <ColorSelect
          value={formData.cor}
          onChange={(value) => onFormChange('cor', value)}
        />

        <div>
          <Label
            htmlFor="contato"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            6. Seu e-mail ou WhatsApp para receber o alerta:
          </Label>
          <Input
            id="contato"
            type="text"
            value={formData.contato}
            onChange={(e) => onFormChange('contato', e.target.value)}
            placeholder="email@exemplo.com ou (99) 99999-9999"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="alerta_global"
              checked={formData.alerta_global}
              onCheckedChange={(checked) =>
                onFormChange('alerta_global', checked)
              }
            />
            <Label htmlFor="alerta_global">
              Quero receber este alerta para todos os veículos com essas
              características.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="enviar_uma_vez"
              checked={formData.enviar_uma_vez}
              onCheckedChange={(checked) =>
                onFormChange('enviar_uma_vez', checked)
              }
            />
            <Label htmlFor="enviar_uma_vez">Enviar apenas uma vez</Label>
          </div>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex justify-center"
      >
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Criando...' : 'Criar Alerta'}
        </Button>
      </motion.div>
    </form>
  </motion.div>
)
