import { useUserStore } from '@/store/user.store'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Joyride, {
  STATUS,
  EVENTS,
  CallBackProps,
  Status,
  Step,
} from 'react-joyride'

export function CoinsTour() {
  const [runTour, setRunTour] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenTour')

    const hasSeenCoinsTour = localStorage.getItem('hasSeenCoinsTour')
    if (!hasSeenCoinsTour && hasSeenTour) {
      const timer = setTimeout(() => setRunTour(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, action, index } = data

    const finishedStatuses: Status[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setRunTour(false)
      localStorage.setItem('hasSeenCoinsTour', 'true')
      return
    }
    switch (true) {
      case type === EVENTS.STEP_BEFORE && index === 1 && action === 'prev':
        navigate({ to: '/' })
        break

      default:
        break
    }
  }

  const tourSteps: Step[] = [
    {
      target: '#tour-coins',
      content:
        'Aqui você pode ver suas moedas. Use-as para obter análises de IA sobre os veículos!',
      disableBeacon: true,
      placement: 'bottom',
    },
  ]

  return (
    <Joyride
      steps={tourSteps}
      run={runTour}
      continuous
      showSkipButton
      showProgress
      callback={handleJoyrideCallback}
      floaterProps={{
        disableFlip: true,
      }}
      styles={{
        options: {
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: 'rgb(0, 90, 137)',
          color: '#fff',
        },
        buttonBack: {
          color: 'rgb(0, 90, 137)',
        },
        spotlight: {
          borderRadius: '5px',
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
        },
      }}
      locale={{
        next: 'Próximo',
        back: 'Voltar',
        skip: 'Pular',
        last: 'Finalizar',
      }}
    />
  )
}
