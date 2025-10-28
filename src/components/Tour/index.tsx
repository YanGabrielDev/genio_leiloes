import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Joyride, {
  STATUS,
  EVENTS,
  CallBackProps,
  Status,
  Step,
} from 'react-joyride'

interface AppTourProps {
  run: boolean
  setRun: (run: boolean) => void
  firstVehicleId?: number
}

export function AppTour({ run, setRun, firstVehicleId }: AppTourProps) {
  const navigate = useNavigate()

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, action, index } = data

    const finishedStatuses: Status[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status) || action === 'close') {
      setRun(false)
      return
    }

    switch (true) {
      case type === EVENTS.STEP_AFTER && index === 0 && action === 'next':
        if (firstVehicleId) {
          navigate({
            to: '/details/$vehicleId',
            params: { vehicleId: firstVehicleId.toString() },
          })
        }
        break
      case action === 'skip':
        setRun(false)
        break
      case type === EVENTS.STEP_BEFORE && index === 1 && action === 'prev':
        navigate({ to: '/', search: { city: undefined } })
        break

      default:
        break
    }
  }

  const tourSteps: Step[] = [
    {
      target: '#tour-card',
      content: 'Clique em "Ver detalhes" do veículo.',
      disableBeacon: true,
      placement: 'top',
    },
    {
      target: '#tour-analise-ia',
      content:
        'Descubra a Avaliação inteligente e veja se o lance vale a pena.',
      disableBeacon: true,
      placement: 'top',
    },
    {
      target: '#tour-go-to-auction',
      content: 'Acesse o site oficial do leilão para dar seu lance.',
      disableBeacon: true,
      placement: 'top',
    },
    {
      target: '#tour-consultancy',
      content: 'Precisa de ajuda? Fale com um de nossos especialistas.',
      disableBeacon: true,
      placement: 'top',
    },
  ]

  return (
    <Joyride
      steps={tourSteps}
      run={run}
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
        nextLabelWithProgress: 'Próximo',
      }}
    />
  )
}
