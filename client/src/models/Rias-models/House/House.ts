import { HouseEntrance } from '@models/Rias-models/House/HouseEntrances.ts';
import { HousePremise } from '@models/Rias-models/House/HousePremise.ts';
import { HouseObjectState } from '@models/Rias-models/House/HouseObjectState.ts';
import { HouseOwnershipAnnulmentReason } from '@models/Rias-models/House/HouseOwnershipAnnulmentReason.ts';
import { ManagementContracts } from '@models/Rias-models/Managment-contracts/ManagementContracts.ts';
import { ResourceSupplyContracts } from '@models/Rias-models/Resource-supply-contracts/ResourceSupplyContracts.ts';
import { HouseType } from '@utils/constants/constants.ts';

export interface House {
  id: string | number;
  //Идентификатор адресного справочника ФИАС.
  house_guid: string;
  //Уникальный идентификатор дома в ГИС ЖКХ.
  gisgkh_guid: string;
  //Уникальный номер дома в ГИС ЖКХ.
  unique_number: string;
  //Тип объекта (многоквартирный / жилой дом).
  house_type: typeof HouseType;
  //Строка полного адреса объекта.
  full_address: string;
  //ОКТМО.
  oktmo: string;
  //Является ли застройка жилого дома блокированной. true - является, false - не является.
  block: boolean;
 //Количество подземных этажей.
  underground_floor_count: number;
  //Общая площадь здания.
  total_square: string;
  //Год ввода объекта в эксплуатацию.
  used_year: number
  //Количество этажей, наименьшее.
  floor_count: number;
  //Наличие у дома статуса культурного наследия. true - является, false - не является.
  cultural_heritage: boolean;
  //Код состояния объекта по справочнику НСИ №24 "Состояние дома".
  state: string
  //Кадастровый номер объекта.
  cadastral_number: string;
  //Код причины аннулирования объекта по справочнику НСИ №330 "Причины аннулирования объекта жилищного фонда".
  annulment_reason_code: string;
  //Дополнительная информация об аннулировании объекта.
  annulment_info: string;
  //Дата последней модификации данных по объекту в ГИС ЖКХ.
  modification_date: string;
  //Дата последней синхронизации с ГИС ЖКХ.
  sync_date: string;
  //Дата прекращения существования объекта.
  termination_date: string;
  //Тут с фронта добавлено поле для карты, координата каждого дома
  geometry: number[];
  //Подъезды
  entrances: HouseEntrance[];
  //Помещения
  premises: HousePremise[];
  //Приборы учета
  devices: any;
  //Договоры ресурсоснабжения по данному объекту. В том числе для всех помещений и комнат
  resourceSupplyContracts: ResourceSupplyContracts[];
  //Договоры управления
  managementContracts: ManagementContracts[];
  //Элемент справочника НСИ №24 "Состояние дома"
  objectState: HouseObjectState;
  //Элемент справочника НСИ №330 "Причина аннулирования объекта жилищного фонда"
  houseOwnershipAnnulmentReason: HouseOwnershipAnnulmentReason;
}

