import { AppealAnswers } from '@models/Rias-models/Appeals/AppealAnswers.ts';
import { AppealAttachments } from '@models/Rias-models/Appeals/AppealAttachments.ts';

export interface Appeals {
  id: number;
  //Идентификатор исполнителя
  executor_id: number;
  // Идентификатор отправителя
  sender_id: number;
  //Идентификатор организации
  organization_id: number;
  // Идентификатор подразделения
  organization_branch_id: number;
  //Идентификатор ГИС (GUID)
  gis_guid: string;
  //Номер обращения
  unique_number: string;
  //Дата обращения
  appeal_date: Date;
  // Тема обращения из справочника НСИ 220
  appeal_topic_code: string;
  //Иная тема обращения
  another_topic: string;
  //Тип заявителя (физ. лицо или юр.лицо)
  applicant_type: string;
  //Имя заявителя (физ. лицо)
  applicant_name: string;
  //ГИС-идентификатор организации (юр. лицо)
  applicant_org_guid: string;
  //ОГРН организации (юр. лицо)
  applicant_org_ogrn: string
  //Название организации (юр. лицо)
  applicant_org_title: string;
  //Обращение сформировано ГИС ЖКХ
  is_hcs_appeal: boolean;
  //Идентификатор родительского обращения
  parent_appeal_guid: string;
  //Код ФИАС дома
  fias_house_guid: string;
  //Идентификатор дома в РИАС
  house_id: number;
  //Адрес дома (может не указываться, если отсутствует код ФИАС или если указан house_id)
  house_address: string;
  // код ОКТМО
  oktmo: string;
  //Текст обращения
  appeal_text: string;
  //Статус обращения
  appeal_status: string;
  // Обращение отозвано заявителем
  is_withdrawn: boolean;
  //Комментарий заявителя при отзыве
  withdrawn_comment: string;
  //Обращение переадресовано
  is_redirected: boolean;
  //ОГРН организации, которой переадресовано обращение
  redirect_receiver_ogrn: string;
  //Название организации, которой переадресовано обращение
  redirect_receiver_title: string;
  //Сроки рассмотрения обращения продлены
  is_rolled_over: boolean;
  //Дата, по которую продлен срок рассмотрения обращения
  rollover_date: Date;
  //Комментарий к продлению сроков
  rollover_comment: string;
  //Признак Ответ не требуется
  answer_is_not_required: boolean;
  //Причина, по которой ответ не требуется
  not_required_answer_cause: string;
  // Оценка, поставленная исполнителю
  assesment_status: string;
  //Почтовый адрес заявителя
  post_address: string;
  //Номер помещения
  apartment_number: string;
  // Адрес эл. почты заявителя
  email: string;
  //Номер телефона заявителя
  phone_number: string;
  // Дата последней синхронизации с ГИС ЖКХ
  sync_date: string;
  //Описание ошибок загрузки или синхронизации
  review: string;
  //Дата последних изменений (в т.ч. в ГИС ЖКХ)
  modification_date: string;
  //Плановая дата выполнения, установленная исполнителем
  date_of_appointment: Date;
  //Дата исполнения обращения из ГИС ЖКХ
  execution_end_date: Date;
  //Требования нормативно-правовых актов, на основании которых рассчитывается дата исполнения
  npa_requirements: string;
  //Является ли заявитель собственником
  is_owner: boolean;
  appealAnswers: AppealAnswers[];
  appealAttachments:AppealAttachments[];
}