import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ConditionRadioGroup } from '../ConditionRadioGroup'
import { ColorSelect } from '../ColorSelect'
import { YearRangeInput } from '../YearRangeInput'
import { AlertFormData } from '../../types'
import { Form, useForm } from 'react-hook-form'
import {
  alertFormSchema,
  AlertFormValues,
} from '../../schemas/alert-form.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrency } from '../../utils/currency.utils'

interface AlertFormProps {
  onSubmit: (data: AlertFormValues) => void // Changed this line
  isSubmitting?: boolean
}
const colors = [
  'Prata',
  'Branco',
  'Preto',
  'Vermelho',
  'Azul',
  'Verde',
  'Cinza',
  'Amarelo',
  'Laranja',
  'Marrom',
]

export const AlertForm = ({
  onSubmit,
  isSubmitting = false,
}: AlertFormProps) => {
  const form = useForm<AlertFormValues>({
    resolver: zodResolver(alertFormSchema),
    defaultValues: {
      momento_alerta: 'antes',
      valor_referencia: '',
      marca_modelo: '',
      ano_de: '',
      ano_ate: '',
      cor: '',
      contato: '',
      alerta_global: false,
      enviar_uma_vez: false,
    },
  })
  const handleCurrencyBlur = (field: 'valor_referencia') => {
    const value = form.getValues(field)
    if (value) {
      form.setValue(field, formatCurrency(value), { shouldValidate: true })
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Criar Alerta Personalizado
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="momento_alerta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    1. Deseja receber o alerta quando?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="antes" />
                        </FormControl>
                        <FormLabel>Antes do valor X ser atingido</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="exato" />
                        </FormControl>
                        <FormLabel>
                          No exato momento em que o valor X for atingido
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="depois" />
                        </FormControl>
                        <FormLabel>Após o valor X ser ultrapassado</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="valor_referencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="valor_referencia"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    2. Valor de referência para o alerta (R$):
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="valor_referencia"
                      placeholder="Exemplo: 15000"
                      {...field}
                      onChange={(e) => {
                        // Allow only numbers
                        const value = e.target.value.replace(/\D/g, '')
                        field.onChange(value)
                      }}
                      onBlur={() => handleCurrencyBlur('valor_referencia')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marca_modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="marca_modelo"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    3. Marca e Modelo:
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="marca_modelo"
                      placeholder="Exemplo: Volkswagen Gol"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ano_de"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="ano_de"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      4. Ano desejado (de):
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="ano_de"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        placeholder="Exemplo: 2015"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ano_ate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="ano_ate"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      até:
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="ano_ate"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        placeholder="Exemplo: 2020"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="cor"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    5. Cor desejada:
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma cor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="contato"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    6. Seu e-mail ou WhatsApp para receber o alerta:
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="contato"
                      placeholder="email@exemplo.com ou (99) 99999-9999"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="alerta_global"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>
                      Quero receber este alerta para todos os veículos com essas
                      características.
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enviar_uma_vez"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Enviar apenas uma vez</FormLabel>
                  </FormItem>
                )}
              />
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
      </Form>
    </motion.div>
  )
}
