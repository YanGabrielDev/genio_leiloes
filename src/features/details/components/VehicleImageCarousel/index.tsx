import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface VehicleImageCarouselProps {
  images: string[]
  marcaModelo: string
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function VehicleImageCarousel({
  images,
  marcaModelo,
}: VehicleImageCarouselProps) {
  const [api, setApi] = useState<any>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    // Update the selected index when the carousel changes slide
    api.on('select', () => {
      setSelectedIndex(api.selectedScrollSnap())
    })
  }, [api])

  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }

  return (
    <motion.div variants={fadeIn} className="flex flex-col gap-4">
      <Card className="overflow-hidden">
        {/* Adicione a propriedade opts para habilitar o "arrastar" */}
        <Carousel className="w-full" setApi={setApi} opts={{ dragFree: true }}>
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative aspect-video overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`${marcaModelo} - Imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm" />
            </>
          )}
        </Carousel>
      </Card>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`w-20 h-14 rounded-md overflow-hidden cursor-pointer border-2 ${
                selectedIndex === index
                  ? 'border-blue-500'
                  : 'border-transparent'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}