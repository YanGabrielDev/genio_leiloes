export const getCurrentVehicleId = (currentLinl: string) => {
  const params = new URLSearchParams(currentLinl)
  return Number(params.get('data'))
}
