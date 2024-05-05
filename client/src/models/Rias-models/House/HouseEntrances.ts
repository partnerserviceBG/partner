import { HousePremise } from '@models/Rias-models/House/HousePremise.ts';

export interface HouseEntrance {
  //Год создания подъезда.
  creation_year: number;
  //Идентификатор подъезда в ГИС ЖКХ.
  guid: string;
  id: number;
  //Дата последней модицикации данных по подъезду в ГИС ЖКХ.
  modification_date: string;
  //Номер подъезда.
  number: number;
  //Количество этажей в подъезде.
  storeys_number: number;
  //Дата прекращения существования подъезда.
  termination_date: string | null;
  premises: HousePremise[]
}