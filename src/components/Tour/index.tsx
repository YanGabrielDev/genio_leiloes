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

interface AppTourProps {
  firstVehicleId?: number
}

export function AppTour({ firstVehicleId }: AppTourProps) {
  const [runTour, setRunTour] = useState(false)
  const navigate = useNavigate()
  const { userProfile } = useUserStore()

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour')
    if (!hasSeenTour) {
      const timer = setTimeout(() => setRunTour(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, action, index } = data

    const finishedStatuses: Status[] = [STATUS.FINISHED, STATUS.SKIPPED]

    // Finaliza o tour se o usuário clicar em "Finalizar", "Pular" ou no botão de fechar
    if (finishedStatuses.includes(status)) {
      setRunTour(false)
      localStorage.setItem('hasSeenTour', 'true')
      return
    }
    // Lógica de navegação entre as páginas
    switch (true) {
      // Após o primeiro passo (na página de listagem), navega para os detalhes.
      case type === EVENTS.STEP_AFTER && index === 0 && action === 'next':
        if (firstVehicleId) {
          navigate({
            to: '/details/$vehicleId',
            params: { vehicleId: firstVehicleId.toString() },
          })
        }
        break

      // No primeiro passo da página de detalhes (índice 1), ao clicar em "Voltar".
      case type === EVENTS.STEP_BEFORE && index === 1 && action === 'prev':
        navigate({ to: '/' })
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
      target: '#tour-consultancy',
      content: 'Precisa de ajuda? Fale com um de nossos especialistas.',
      disableBeacon: true,
      placement: 'top',
    },
    {
      target: '#tour-go-to-auction',
      content: 'Acesse o site oficial do leilão para dar seu lance.',
      disableBeacon: true,
      placement: 'top',
    },
  ]
  if (userProfile) {
    tourSteps.unshift({
      target: '#tour-coins',
      content:
        'Aqui você pode ver suas moedas. Use-as para obter análises de IA sobre os veículos!',
      disableBeacon: true,
      placement: 'bottom',
    })
  }
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
