export const formatTemperature = (temperture: number): number => {
    const kelvin = 273 
    return Math.round(temperture - kelvin)
}