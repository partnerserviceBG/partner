export interface ContractBase {
  //Идентификатор записи в ГИС ЖКХ
  guid: string;
  //Код записи
  code: string;
  //Признак того, является ли запись архивной (true) или нет (false)
  archived: boolean;
  //Признак того, является ли запись актуальной (true) или нет (false)
  is_actual: boolean;
  //Дата и время последнего обновления записи в ГИС ЖКХ
  modified: string;
  // Основание для заключения договора
  title: string;
  //Применимо ли к договорам управления
  applicable_to_management_contracts: boolean;
  // Применимо ли к договорам ресурсоснабжения
  applicable_to_resource_supply_contracts: boolean;

}