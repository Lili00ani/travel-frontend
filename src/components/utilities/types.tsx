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

export interface PlacePreview {
  id: number;
  google_places: string;
  lat: number;
  lng: number;
  notes: string;
  name: string;
  address: string;
  day: number;
  ind: number;
  start: Date;
  end: Date;
}

export interface ItineraryAttributes {
  id: number;
  day: number;
  color: string;
  place_id: number;
  start: Date;
  end: Date;
  index: number;
  travel_id: number;
}
