// src/components/Tour.tsx
import { useEffect, useState } from 'react'
import Joyride, { STATUS } from 'react-joyride'

export function AppTour() {
  const [runTour, setRunTour] = useState(false)

  useEffect(() => {
    // Inicia o tour automaticamente quando o componente é montado.
    // Você pode adicionar uma condição, como verificar se o usuário já viu o tour.
    const hasSeenTour = localStorage.getItem('hasSeenTour')
    if (!hasSeenTour) {
      setRunTour(true)
    }
  }, [])

  const handleJoyrideCallback = (data: any) => {
    const { status } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setRunTour(false)
      localStorage.setItem('hasSeenTour', 'true') // Marca que o tour já foi visto
    }
  }

  return (
    <Joyride
      steps={[
        {
          target: '#tour-card',
          content: 'Clique em "Ver detalhes" do veículo.',
          disableBeacon: true,
          placement: 'top', // Adicione esta linha
        },
        {
          target: '#tour-analise-ia',
          content:
            'Descubra a Avaliação inteligente e veja se o lance vale apena.',
          disableBeacon: true,
          placement: 'top', // Adicione esta linha
        },
        // {
        //   target: '#tour-modal-analise',
        //   content:
        //     'Aqui você verá a análise completa da nossa IA, com informações sobre o estado do veículo e se vale a pena a compra.',
        //   disableBeacon: true,
        //   placement: 'top', // Adicione esta linha
        // },
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
          // Estiliza o botão "Next"
          backgroundColor: 'rgb(0, 81, 124)',
          color: '#fff', // Para garantir que o texto seja visível
        },
        // Removemos o marginTop do tooltip já que o placement está sendo usado nos steps.
        // tooltip: {
        //   marginTop: '20px',
        // },
        spotlight: {
          borderRadius: '5px',
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
        },
      }}
      locale={{
        next: 'Próximo', // Altera o texto do botão "Next"
        back: 'Voltar', // Opcional: para consistência, se tiver um botão "Back"
        skip: 'Pular', // Opcional: para consistência
        last: 'Finalizar', // Opcional: para consistência
      }}
    />
  )
}
