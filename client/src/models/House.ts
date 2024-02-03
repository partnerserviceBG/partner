type HouseType = 'apartment' | 'residential';

export interface House {
  annulment_info?: string;
  annulment_reason_code?: string;
  block?: boolean;
  cadastral_number?: string;
  cultural_heritage?: boolean;
  floor_count?: number;
  full_address?: string;
  gisgkh_guid?: string;
  house_guid: string;
  house_type: HouseType;
  id: number;
  modification_date?: Date;
  oktmo: string;
  state: string;
  sync_date?: Date;
  termination_date?: Date;
  total_square: number;
  underground_floor_count?: number;
  unique_number?: string;
  used_year?: number;
  geometry?: number[];
}
