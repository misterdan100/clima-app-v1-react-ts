import { useState, ChangeEvent, FormEvent } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css'
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather}: FormProps) {
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: '',
    })
    const [alert, setAlert] = useState('')



    const frecuentCountries = countries.filter( country => country.continent === 'SA' || country.continent === 'NA' || country.code === 'ES')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(search).includes('')) {
            setAlert('All field are required.')
            return
        }

        fetchWeather(search)
    }

  return (
    <form 
        className={styles.form}
        onSubmit={handleSubmit}
    >
        {alert && <Alert >{alert}</Alert>}
        <div className={styles.field}>
            <label htmlFor="city">City: </label>
            <input 
                type="text" 
                id="city"
                name="city"
                placeholder="City..."
                value={search.city}
                onChange={handleChange}

            />
        </div>
        <div className={styles.field}>
            <label htmlFor="country">Country: </label>
            <select name="country" id="country"
            value={search.country}
            onChange={handleChange}
            >
                <option value=""></option>
                {frecuentCountries.map( country => (
                    <option 
                    key={country.code}
                    value={country.code}
                    >{country.name}</option>
                ))}
            </select>
        </div>

        <input 
            type="submit" 
            value='Get Weather'
            className={styles.submit}
        />
    </form>
  )
}
