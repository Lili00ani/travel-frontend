export interface Travel {
  owner_id: string;
  name: string;
  start: Date;
  end: Date;
  pax: number;
  country_code: string;
}

export interface Country {
  name: string;
  code: string;
}

export interface TravelCard {
  id: number;
  name: string;
  start: string;
  end: string;
  pax: number;
  country_code: string;
  created_at: string;
  updated_at: string;
}
