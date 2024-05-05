export interface DebtRequest {
  id: number;
  // Начало периода
  start_range_date: string;
  //Окончание периода
  end_range_date: string;
  // Дата отправки
  send_date: string;
  //Дата ответа
  response_date: string;
  //ГИС GUID
  gis_guid: string;
  // Номер
  request_number: string;
  //Идентификатор организации
  request_org_id: number;
  // Статус
  request_status: string;
  //GUID автора запроса
  request_author_guid: string;
  //ФИО автора запроса
  request_author_fio: string;
  //ФИАС GUID здания
  fias_house_guid: string;
  //Адрес
  address: string;
  // GUID дома
  gisgkh_guid: string;
  //Детали адреса
  address_detail: string;
  // Идентификатор дома
  house_id: number;
  // Дата синхронизации
  sync_date: string;
  //Ревью
  review: string;
  // Дата изменения
  modification_date: string;
}