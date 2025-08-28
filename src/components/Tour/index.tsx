import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Joyride, {
  STATUS,
  EVENTS,
  CallBackProps,
  Actions,
  Status,
  Step,
} from 'react-joyride'

interface AppTourProps {
  firstVehicleId?: number
}

export function AppTour({ firstVehicleId }: AppTourProps) {
  const [runTour, setRunTour] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour')
    if (!hasSeenTour) {
      const timer = setTimeout(() => setRunTour(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const steps: Step[] = [
    {
      target: '#tour-card',
      content: 'Clique em "Ver detalhes" do veículo.',
      disableBeacon: true,
      placement: 'top' as const,
      locale: {
        next: 'Próximo passo', // Texto customizado para o próximo no primeiro passo
        back: 'Voltar',
        skip: 'Pular',
        last: 'Finalizar',
        nextLabelWithProgress: 'Próximo passo',
      },
    },
    {
      target: '#tour-analise-ia',
      content:
        'Descubra a Avaliação inteligente e veja se o lance vale a pena.',
      disableBeacon: true,
      placement: 'top' as const,
      locale: {
        next: 'Próximo',
        back: 'Voltar',
        skip: 'Pular',
        last: 'Finalizar tour', // Texto customizado para finalizar
      },
    },
  ]

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, action, index } = data

    console.log('Tour callback:', { action, type, status, index })

    // Atualiza o índice do passo atual
    if (type === EVENTS.STEP_AFTER) {
      setCurrentStepIndex(index + 1)
    } else if (type === EVENTS.STEP_BEFORE && action === 'prev') {
      setCurrentStepIndex(index - 1)
    }

    // Lógica de navegação específica
    switch (true) {
      // NEXT no primeiro passo - navega para detalhes
      case type === EVENTS.STEP_AFTER && index === 0:
        if (firstVehicleId) {
          navigate({
            to: '/details/$vehicleId',
            params: { vehicleId: firstVehicleId.toString() },
          })
        }
        break

      // BACK no segundo passo (último) - volta para home
      case type === EVENTS.STEP_BEFORE && index === 1 && action === 'prev':
        navigate({ to: '/' })
        break

      // FINALIZAR no último passo - termina o tour
      case type === EVENTS.STEP_AFTER && index === 1 && action === 'next':
      case type === EVENTS.TOUR_END && status === STATUS.FINISHED:
        setRunTour(false)
        localStorage.setItem('hasSeenTour', 'true')
        break

      // SKIP ou fechamento forçado
      case ([STATUS.SKIPPED, STATUS.FINISHED] as Status[]).includes(status):
        setRunTour(false)
        localStorage.setItem('hasSeenTour', 'true')
        break

      default:
        break
    }
  }

  const handleCloseTour = () => {
    setRunTour(false)
    localStorage.setItem('hasSeenTour', 'true')
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
            nextLabelWithProgress: 'Próximo',
          },
        },
        {
          target: '#tour-analise-ia',
          content:
            'Descubra a Avaliação inteligente e veja se o lance vale a pena.',
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
