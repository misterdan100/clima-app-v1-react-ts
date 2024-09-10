export type SearchType = {
  city: string;
  country: string;
};

export type Country = {
  code: string
  name: string
  es_name: string
  continent: string
}

export type Weather = {
  name: string
  main: {
    temp: number
    temp_max: number
    temp_min: number
  }

}

export type Country1 = {
  id: number
  name: string
};

export type State = {
  id: number
  id_country: number
  name: string
};

export type City = {
  id: number
  id_state: number
  name: string
};