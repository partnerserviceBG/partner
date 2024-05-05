import { VerificationInterval } from '@models/Rias-models/VerificationInterval.ts';
import { DeviceType } from '@utils/constants/constants.ts';
import { MeteringDeviceResource } from '@models/Rias-models/Metering-device/MeteringDeviceResource.ts';
export interface MeteringDevice {
  id: number;
  //Идентификатор прибора учета в ГИС ЖКХ.
  gis_guid: string;
  //Уникальный номер прибора учета в ГИС ЖКХ.
  unique_number: string;
  //Идентификатор версии прибора учета в ГИС ЖКХ.
  version_guid: string;
  //Тип прибора учета (коллективный(общедомовой) / индивидуальный / комнатный / общий(квартирный))
  type: typeof DeviceType;
  //Идентификатор адресного справочника ФИАС объекта, к которому относится прибор учета.
  fias_house_guid: string;
  // Идентификатор (id) объекта, к которому относится прибор учета, в РИАС.
  house_id: number
  //Идентификатор помещения(блока) (HousePremise) в РИАС, к которому относится прибор учета.
  premise_id: number;
  //Идентификатор комнаты (HouseRoom) в РИАС, к которой относится прибор учета.
  room_id: number;
  //Заводской(серийный) номер прибора учета. Уникальный для организации.
  number:string;
  //Марка прибора учета.
  stamp: string;
  //Модель прибора учета.
  model: string;
  //Дата установки прибора учета.
  installation_date: string;
  //Дата ввода в эксплуатацию прибора учета.
  commissioning_date: string;
  // Наличие возможности дистанционного снятия показаний прибора учета. true - есть возможность, false - нет возможности.
  remote_metering_mode: boolean;
  //Информация о наличии возможности дистанционного снятия показаний прибора учета.
  remote_metering_info: string;
  //Дата последней поверки прибора учета.
  first_verification_date: string;
  //Код межповерочного интервала прибора учета по справочнику НСИ №16 "Межповерочный инетрвал".
  verification_interval_code: string;
  //Дата опломбирования прибора учета заводом-изготовителем.
  factory_seal_date: string;
  //Наличие датчиков температур. true - есть, false - нет.
  temperature_sensor: boolean;
  //Информация о наличии датчиков температуры с указанием их местоположения на узле учета.
  temperature_sensing_element_info: string;
  //Наличие датчиков давления. true - есть, false - нет.
  pressure_sensor: boolean;
  //Информация о наличии датчиков давления с указанием их местоположения на узле учета.
  pressure_sensing_element_info: string;
  //Число (день месяца) начала сдачи показаний, от 1 до 30.
  readings_delivery_first_day: number
 //Месяц начала сдачи показаний - если false, то текущий расчётный месяц, true - следующий месяц за расчётным.
  readings_delivery_first_day_next_month: boolean;
  //День месяца окончания сдачи показаний, от 1 до 30, либо -1 если это последний день месяца).
  readings_delivery_last_day: number;
  //Месяц окончания сдачи показаний - если false, то текущий расчётный месяц, true - следующий месяц за расчётным.
  readings_delivery_last_day_next_month: boolean;
  //Код причины архивации прибора учета по справочнику НСИ №21 "Причина архивации прибора учета". В случае если прибор заархивирован через личный кабинет в ГИС ЖКХ, то прийдет код - "99".
  archiving_reason_code: string;
  //Дата последней синхронизации с ГИС ЖКХ.
  sync_date: string;
  //Дата последней модификации данных прибора учета в ГИС ЖКХ.
  modification_date: string;
  //Результаты загрузки прибора учета в РИАС и подготовки его к отправке в ГИС ЖКХ
  //   Приходит массив следующего формата:
  //     ["load" : "ok", "prepareToSend" : "ok"] ,
  //   где load - результат загрузки в РИАС, а prepareToSend - результат подготовки к отправке в ГИС.
  //   Могут принимать значения "ok" (выполнено успешно) или "error" (при выполнении возникли ошибки)
  result: string;
  //Массив, содержащий описания ошибок, возникших в процессе выполнения операций
  errors: string[];
  //Элемент справочника НСИ №16 "Межповерочный интервал".
  verificationInterval: VerificationInterval;
  //Сведения о коммунальных ресурсах и базовые показания прибора учета
  resources: MeteringDeviceResource;
}