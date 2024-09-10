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