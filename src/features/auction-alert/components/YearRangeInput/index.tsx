import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface YearRangeInputProps {
  yearFrom: string
  yearTo: string
  onYearFromChange: (value: string) => void
  onYearToChange: (value: string) => void
}

export const YearRangeInput = ({
  yearFrom,
  yearTo,
  onYearFromChange,
  onYearToChange,
}: YearRangeInputProps) => (
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
        onChange={(e) => onYearFromChange(e.target.value)}
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
        onChange={(e) => onYearToChange(e.target.value)}
        placeholder="Exemplo: 2020"
        className="w-full"
      />
    </div>
  </div>
)
