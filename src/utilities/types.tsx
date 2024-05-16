export interface Travel {
  id: number;
  owner_id: string;
  name: string;
  start: Date;
  end: Date;
  pax: number;
  country_code: string;
  created_at: Date;
  updated_at: Date;
}

export interface Country {
  name: string;
  code: string;
}

export interface Place {
  travel_id: number;
  google_places: string;
  lat: number;
  lng: number;
  notes: string;
  name: string;
  address: string;
}
