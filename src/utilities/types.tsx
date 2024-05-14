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
