import { useState, useMemo, useRef, useEffect } from 'react'
import { List } from 'react-window'
import { motion, AnimatePresence } from 'framer-motion'

interface Option {
  id: string
  label: string
  value: string
}

interface SelectSearchProps {
  options: Option[]
  placeholder?: string
  onSelectValue: (option: Option) => void
}

const itemHeight = 40

export function DropdownFilter({
  options,
  placeholder = 'Selecione...',
  onSelectValue,
}: SelectSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  const filteredOptions = useMemo(() => {
    if (!searchValue) {
      return options
    }
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [options, searchValue])
  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    setSearchValue('')
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (selectedOption) {
      onSelectValue(selectedOption)
    }
  }, [selectedOption, onSelectValue])

  const Row: React.FC<{ index: number; style: React.CSSProperties }> = ({
    index,
    style,
  }) => {
    const option = filteredOptions[index]
    if (!option) return null
    return (
      <div
        style={style}
        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        onClick={() => handleSelect(option)}
      >
        {option.label}
      </div>
    )
  }

  return (
    <div ref={selectRef} className="relative w-full font-sans ">
      <div
        className={`flex h-9 text-gray-500 rounded-md border border-gray-500 bg-gray-50 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none outline-gray-700 focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70 md:text-sm border-s w-full`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          {selectedOption ? (
            <div className="flex items-center gap-2">
              <span>{selectedOption.label}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedOption(null)
                  setSearchValue('')
                }}
                aria-label="Limpar seleção"
              ></button>
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[80] w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-2">
              <input
                type="text"
                className="w-full p-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-blue-500"
                placeholder="Buscar..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                autoFocus
              />
            </div>

            {filteredOptions.length > 0 ? (
              <List
                className="no-scrollbar"
                rowCount={filteredOptions.length}
                rowHeight={itemHeight}
                rowComponent={Row}
                rowProps={{}}
              />
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Nenhum resultado encontrado.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
