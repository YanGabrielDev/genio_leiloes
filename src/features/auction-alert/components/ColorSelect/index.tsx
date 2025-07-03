import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

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

interface ColorSelectProps {
  value: string
  onChange: (value: string) => void
}

export const ColorSelect = ({ value, onChange }: ColorSelectProps) => (
  <>
    <Label
      htmlFor="color"
      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      5. Cor desejada:
    </Label>
    <Select value={value} onValueChange={onChange}>
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
  </>
)
