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
      <RadioGroupItem value="antes" id="antes" />
      <Label htmlFor="antes">Antes do valor X ser atingido</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="exato" id="exato" />
      <Label htmlFor="exato">
        No exato momento em que o valor X for atingido
      </Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="depois" id="depois" />
      <Label htmlFor="depois">Após o valor X ser ultrapassado</Label>
    </div>
  </RadioGroup>
)
