// src/components/Tour.tsx
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Joyride, { STATUS, EVENTS, CallBackProps } from 'react-joyride'

interface AppTourProps {
  firstVehicleId?: number
}

export function AppTour({ firstVehicleId }: AppTourProps) {
  const [runTour, setRunTour] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour')
    if (!hasSeenTour) {
      setRunTour(true)
    }
  }, [])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, index } = data
    const finishedStatuses: CallBackProps['status'][] = [
      STATUS.FINISHED,
      STATUS.SKIPPED,
    ]

    if (finishedStatuses.includes(status)) {
      setRunTour(false)
      localStorage.setItem('hasSeenTour', 'true')
    }
    if (action === 'update') {
      if (index === 0 && firstVehicleId) {
        navigate({
          to: '/details/$vehicleId',
          params: { vehicleId: firstVehicleId?.toString() },
        })
        setRunTour(false)
      }
    }
  }

  return (
    <Joyride
      steps={[
        {
          target: '#tour-card',
          content: 'Clique em "Ver detalhes" do veículo.',
          disableBeacon: true,
          placement: 'top',
          locale: {
            next: 'Próximo',
            back: 'Voltar',
            skip: 'Pular',
            last: 'Finalizar',
            nextLabelWithProgress: 'Finalizar',
          },
        },
        {
          target: '#tour-analise-ia',
          content:
            'Descubra a Avaliação inteligente e veja se o lance vale apena.',
          disableBeacon: true,
          placement: 'top',
          locale: {
            next: 'Próximo',
            back: 'Voltar',
            skip: 'Pular',
            last: 'Finalizar',
          },
        },
      ]}
      run={runTour}
      continuous
      showSkipButton
      showProgress
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: '#fa9805',
          color: '#fff',
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
