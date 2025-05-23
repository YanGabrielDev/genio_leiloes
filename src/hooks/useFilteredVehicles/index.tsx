import { useState, useEffect } from "react"
import { Vehicles } from "../../interfaces/vehicle.interface"

export const useFilteredVehicles = (initialData: Vehicles[]) => {
  const [filteredVehicles, setFilteredVehicles] = useState(initialData)

  const filterBySearch = (searchValue: string) => {
    const lowerCasedSearch = searchValue.toLowerCase()
    setFilteredVehicles(
      initialData.filter((vehicle) =>
        vehicle.marca_modelo.toLowerCase().includes(lowerCasedSearch)
      )
    )
  }

  useEffect(() => {
    setFilteredVehicles(initialData)
  }, [initialData])

  return { filteredVehicles, filterBySearch }
}
