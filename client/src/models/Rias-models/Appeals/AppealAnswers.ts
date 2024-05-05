export interface AppealAnswers {
  // Идентификатор ответа в РИАС
  id: number;
  //Дата отправки ответа на обращение
  answer_date: Date;
  //Текст ответа
  answer_text: string;
  //Номер ответа на обращение (он же уникальный номер в ГИС ЖКХ)
  unique_number: string;
  //Идентификатор ответа в ГИС ЖКХ
  gis_guid: string;
  //Признак Ответ отправлен
  is_sent: string;
  //Дата изменения
  modification_date: string;
  //Дата синхронизации с ГИС ЖКХ
  sync_date: string;
  //Ошибки, возникшие при синхронизации с ГИС ЖКХ
  review: string;
}