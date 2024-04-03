type HouseType = 'apartment' | 'residential';

interface Entrances {
  creation_year: number;
  guid: string;
  id: number;
  modification_date: string;
  number: number;
  storeys_number: number;
  termination_date: string | null;
}

export interface House {
  annulment_info: string;
  annulment_reason_code: string;
  block: boolean;
  cadastral_number: string;
  cultural_heritage: boolean;
  floor_count: number;
  full_address: string;
  gisgkh_guid: string;
  house_guid: string;
  house_type: HouseType;
  id: number;
  modification_date?: Date;
  oktmo: string;
  state: string;
  sync_date: Date;
  termination_date: Date;
  total_square: string;
  underground_floor_count: number;
  unique_number: string;
  used_year: number;
  geometry: number[];
  entrances: Entrances[];
  rooms: string[];
}
