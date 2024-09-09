import { countries } from "../../data/countries";
import styles from './Form.module.css'

export default function Form() {

    const frecuentCountries = countries.filter( country => country.continent === 'SA' || country.continent === 'NA' || country.code === 'ES')

  return (
    <form className={styles.form}>
        <div className={styles.field}>
            <label htmlFor="city">City: </label>
            <input 
                type="text" 
                id="city"
                name="city"
                placeholder="City..."
            />
        </div>
        <div className={styles.field}>
            <label htmlFor="city">Country: </label>
            <select name="" id="">
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
