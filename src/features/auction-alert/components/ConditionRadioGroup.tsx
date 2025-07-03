import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AlertCondition } from '../types'

interface ConditionRadioGroupProps {
  value: AlertCondition
  onChange: (value: AlertCondition) => void
}

export const ConditionRadioGroup = ({
  value,
  onChange,
}: ConditionRadioGroupProps) => (
  <RadioGroup
    value={value}
    onValueChange={onChange}
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
)
