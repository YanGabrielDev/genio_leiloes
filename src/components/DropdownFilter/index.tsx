import { useState, useMemo, useRef, useEffect } from 'react'
import { List } from 'react-window'
import { motion, AnimatePresence } from 'framer-motion'

interface Option {
  id: number
  label: string
  value: string
}

interface SelectSearchProps {
  options: Option[]
  placeholder?: string
  onSelectValue: (option: Option | null) => void
  fullWidth?: boolean
  showSearch?: boolean
}

const itemHeight = 40

export function DropdownFilter({
  options,
  placeholder = 'Selecione...',
  onSelectValue,
  fullWidth,
  showSearch,
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
    onSelectValue(option)
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
    <div
      ref={selectRef}
      className={`relative font-sans ${fullWidth ? 'w-full' : 'w-auto'}`}
    >
      <div
        className={`flex h-9 w-full cursor-pointer items-center rounded-md border border-gray-500 bg-gray-50 px-3 py-1 text-base text-gray-500 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70 outline-gray-700 md:text-sm border-s`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="mr-2 text-gray-400">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          )}
        </div>
        <div className="flex-1 truncate">
          {selectedOption ? (
            <div className="flex items-center justify-between">
              <span>{selectedOption.label}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedOption(null)
                  setSearchValue('')
                  onSelectValue(null)
                }}
                aria-label="Limpar seleção"
                className="ml-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
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
            className="fixed top-0 left-0 z-[100] h-full w-full bg-background/80 backdrop-blur-sm md:absolute md:top-auto md:left-auto md:z-[80] md:h-auto md:w-full md:bg-white md:dark:bg-gray-800 md:backdrop-blur-none md:border md:border-gray-300 md:dark:border-gray-600 md:rounded-lg md:shadow-lg"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full bg-white dark:bg-gray-800 md:rounded-lg shadow-lg max-h-[60vh] md:max-h-80 flex flex-col"
            >
              {showSearch && (
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-blue-500"
                    placeholder="Buscar..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    autoFocus
                  />
                </div>
              )}

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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
