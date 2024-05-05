export interface MunicipalResource {
  //Идентификатор записи в ГИС ЖКХ
  guid: string;
  //Код записи
  code: string;
  //Признак того, является ли запись архивной (true) или нет (false)
  archived: boolean
  //Признак того, является ли запись актуальной (true) или нет (false)
  is_actual: boolean;
  //Дата и время последнего обновления записи в ГИС ЖКХ
  modified: string;
  //Наименование ресурса
  name: string;
  //Сокращенное наименование
  short_name: string;
  //Можно ли для данного ресурса установить связь с прибором учета
  can_link_with_device: boolean;
  //Единица измерения
  okei: string;
  //Порядок сортировки
  order: string;

}