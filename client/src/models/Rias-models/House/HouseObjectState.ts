//Элемент справочника НСИ №24 "Состояние дома".
export interface HouseObjectState {
  //Идентификатор записи в ГИС ЖКХ
  guid: string;
  //Код записи
  code: string
  //Признак того, является ли запись архивной (true) или нет (false)
  archived: boolean;
  // Признак того, является ли запись актуальной (true) или нет (false)
  is_actual: boolean;
  //Дата и время последнего обновления записи в ГИС ЖКХ
  modified: string;
  // Наименование состояние дома
  name: string;

}