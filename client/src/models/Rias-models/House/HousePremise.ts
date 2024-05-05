export interface HousePremise {
  id: number;
  //Идентификатор помещения(блока) в ГИС ЖКХ.
  guid: string;
  //Номер помещения(блока).
  number: string;
  //Номер подъезда где находится помещение.
  entrance_number: number;
  //Код характеристики помещения(блока) по справочнику НСИ №30 "Характеристика помещения".
  characteristic_code: string;
  //Категория помещения(блока). true - жилое, false - нежилое.
  residential: boolean;
  //Общая площадь помещения.
  total_area: number
  //Жилая площадь жилого помещения по паспорту помещения.
  gross_area: number;
  //Помещение, составляющее общее имущество в многоквартирном доме (для нежилых помещений). true - составляет, false - не составляет.
  is_common_property: boolean;
  //Кадастровый номер.
  cadastral_number: string
  //Информация подтверждена поставщиком.
  information_confirmed: boolean;
  //Идентификатор подъезда (HouseEntrance) в РИАС.
  entrance_id: number;
  //Дата последней модификации данных по помещению в ГИС ЖКХ.
  modification_date: string;
  //Дата прекращения существования помещения.
  termination_date: string;
}