export interface DebtSubrequest {
  id: number;
  //ГИС GUID
  gis_guid: string;
  //Статус ответа
  response_status: string;
  //Идентификатор отправителя
  sender_id: number;
  //Идентификатор исполнителя
  executor_id: number;
  //Идентификатор организации
  organization_id: number;
  //Идентификатор подразделения
  organization_branch_id:number;
  answer_is_formed: boolean
  //Прочитано отправителем
  read_by_sender: boolean
  //Прочитано исполнителем
  read_by_executor: boolean;
  // Дата синхронизации
  sync_date: string;
  //Ревью
  review: string;
  //Дата изменения
  modification_date: string;
  //GUID запроса
  request_guid: string;

}