import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

interface TourContextType {
  run: boolean
  setRun: Dispatch<SetStateAction<boolean>>
}

const TourContext = createContext<TourContextType | undefined>(undefined)

export const TourProvider = ({ children }: { children: ReactNode }) => {
  const [run, setRun] = useState(false)

  return (
    <TourContext.Provider value={{ run, setRun }}>
      {children}
    </TourContext.Provider>
  )
}

export const useTour = () => {
  const context = useContext(TourContext)
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider')
  }
  return context
}
