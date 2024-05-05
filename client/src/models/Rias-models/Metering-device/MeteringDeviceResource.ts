import { MunicipalResource } from '@models/Rias-models/MunicipalResource.ts';

export interface MeteringDeviceResource {
  id: number;
  //Код коммунального ресурса по справочнику НСИ №2 "Вид коммунального ресурса".
  municipal_resource_code: string;
  //Базовое значение (для электроэнергии - показания по тарифу Т1).
  value: number;
  //Показания по тарифу Т2, только для для электроэнергии.
  value2: number;
  //Показания по тарифу Т3, только для для электроэнергии.
  value3: number;
  //Коэффициент трансформации, только для для электроэнергии.
  transformation_ratio: number;
  //Элемент справочника НСИ №2 "Вид коммунального ресурса".
  municipalResource: MunicipalResource;

}