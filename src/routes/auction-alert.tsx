import { Template } from '@/components/Template'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
export const Route = createFileRoute('/auction-alert')({
  component: RouteComponent,
})

function RouteComponent() {
  const [alertCondition, setAlertCondition] = useState('before')
  const [referenceValue, setReferenceValue] = useState('')
  const [brandModel, setBrandModel] = useState('')
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [contact, setContact] = useState('')
  const [allVehicles, setAllVehicles] = useState(false)
  const [sendOnce, setSendOnce] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica para enviar o formulário
    console.log({
      alertCondition,
      referenceValue,
      brandModel,
      yearFrom,
      yearTo,
      selectedColor,
      contact,
      allVehicles,
      sendOnce,
    })
  }

  const formatCurrency = (value: string) => {
    let num = value.replace(/\D/g, '')
    num = (Number(num) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    return num
  }

  return (
    <Template toGo="/">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 bg-white rounded-lg p-4"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Criar Alerta Personalizado para Este Veículo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                1. Deseja receber o alerta quando?
              </Label>
              <RadioGroup
                defaultValue="before"
                value={alertCondition}
                onValueChange={setAlertCondition}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="before" id="before" />
                  <Label htmlFor="before">Antes do valor X ser atingido</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exact" id="exact" />
                  <Label htmlFor="exact">
                    No exato momento em que o valor X for atingido
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="after" id="after" />
                  <Label htmlFor="after">Após o valor X ser ultrapassado</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label
                htmlFor="referenceValue"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                2. Valor de referência para o alerta (R$):
              </Label>
              <Input
                id="referenceValue"
                type="text"
                value={referenceValue}
                onChange={(e) => setReferenceValue(e.target.value)}
                onBlur={() => {
                  if (referenceValue) {
                    setReferenceValue(formatCurrency(referenceValue))
                  }
                }}
                placeholder="Exemplo: 15000"
                className="w-full"
              />
            </div>

            <div>
              <Label
                htmlFor="brandModel"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                3. Marca e Modelo:
              </Label>
              <Input
                id="brandModel"
                type="text"
                value={brandModel}
                onChange={(e) => setBrandModel(e.target.value)}
                placeholder="Exemplo: Volkswagen Gol"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="yearFrom"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  4. Ano desejado (de):
                </Label>
                <Input
                  id="yearFrom"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  placeholder="Exemplo: 2015"
                  className="w-full"
                />
              </div>
              <div>
                <Label
                  htmlFor="yearTo"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  até:
                </Label>
                <Input
                  id="yearTo"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  placeholder="Exemplo: 2020"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="color"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                5. Cor desejada:
              </Label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma cor" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="contact"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                6. Seu e-mail ou WhatsApp para receber o alerta:
              </Label>
              <Input
                id="contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="email@exemplo.com"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allVehicles"
                  checked={allVehicles}
                  onCheckedChange={(checked) => setAllVehicles(!!checked)}
                />
                <Label htmlFor="allVehicles">
                  Quero receber este alerta para todos os veículos com essas
                  características.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendOnce"
                  checked={sendOnce}
                  onCheckedChange={(checked) => setSendOnce(!!checked)}
                />
                <Label htmlFor="sendOnce">Enviar apenas uma vez</Label>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-center"
          >
            <Button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Criar Alerta
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </Template>
  )
}
