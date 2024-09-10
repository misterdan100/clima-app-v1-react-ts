import axios from 'axios'
import { z } from 'zod'
import { SearchType } from '../types'
import { useMemo, useState } from 'react'

// zod schema
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})

// define TS type using zod schema
export type Weather = z.infer<typeof Weather>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    }
}

export default function useWeather() {
    const [weather, setWeather] = useState<Weather>({
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    })
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
        try {

            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios(geoUrl)

            // check if city exist
            if(!data[0]) {
                setNotFound(true)
                return
            }
            
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${appId}`
            const { data: weatherResult} = await axios(apiUrl)
            const result = Weather.safeParse(weatherResult)
            if(result.success) {
                setWeather(result.data)
            }

            
        } catch (error) {
            console.warn('fetchWeather: ERROR => ', error)
        } finally {
            setLoading(false)
        }
    }

    // check if weather exists
    const hasWeatherData = useMemo(() => weather.name , [weather])

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData,
    }
}