import { ManagementContractsStatus } from '@utils/constants/constants.ts';
import { ManagementContractProtocol } from '@models/Rias-models/Managment-contracts/ManagementContractProtocol.ts';
import { ContractBase } from '@models/Rias-models/Managment-contracts/ContractBase.ts';

export interface ManagementContracts {
  //Договор аннулирован/не аннулирован. Если true - аннулирован, false - не аннулирован.
  annulled_in_gis: boolean;
  //Причина аннулирования договора.
  annulment_reason: string | null;
  //Идентификатор организации (GisOrganization) в системе РИАС. Если вторая сторона договора Застройщик.
  building_owner_id: number | null;
  //Код основания заключения договора по справочнику НСИ №58 "Основание заключения договора".
  contract_base_code: number;
  //Идентификатор организации (GisOrganization) в системе РИАС. Если вторая сторона договора ТСЖ/Кооператив.
  cooperative_id: number | null;
  //Дата вступления договора в силу.
  effective_date: string;
  //Корневой идентификатор договора управления в ГИС ЖКХ.
  guid: string;
  id: number;
  //Флаг - разрешить передачу гражданам текущих показаний по индивидуальным приборам учета в любой день месяца
  indications_any_day: boolean;
  //Идентификатор организации (GisOrganization) в системе РИАС. Если вторая сторона договора Собственник муниципального жилья.
  municipal_housing_id: number | null;
  //Номер договора.
  number: string;
  //Число (день месяца) представления (выставления) платежных документов для внесения платы за жилое помещение и (или) коммунальные услуги, от 1 до 30, либо -1 (последний день месяца).
  payment_document_last_day: number;
  //Месяц представления (выставления) платежных документов для внесения платы за жилое помещение и (или) коммунальные услуги - если false, то текущий расчётный месяц, true - следующий месяц за расчётным.
  payment_document_last_day_next_month: boolean;
  //Число (день месяца) платы за жилое помещение и (или) коммунальные услуги (не позднее), от 1 до 30, либо -1 (последний день месяца).
  payment_last_day: number;
  //Месяц платы за жилое помещение и (или) коммунальные услуги - если false, то текущий расчётный месяц, true - следующий месяц за расчётным.
  payment_last_day_next_month: boolean;
  //Число (день месяца) окончания передачи показаний индивидуальных и общих (квартирных) приборов учета, от 1 до 31, либо -1 (последний день месяца).
  period_metering_end_day: number;
  //Месяц окончания передачи показаний индивидуальных и общих (квартирных) приборов учета - если false, то текущий расчётный месяц, true - следующий месяц за расчётным.
  period_metering_end_day_next_month: boolean;
  //Число (день месяца) начала передачи показаний индивидуальных и общих (квартирных) приборов учета, от 1 до 31, либо -1 (последний день месяца).
  period_metering_start_day: number;
  //Месяц начала передачи показаний индивидуальных и общих (квартирных) приборов учета - если false, то текущий расчётный месяц, true - следующий месяц за расчётным.
  period_metering_start_day_next_month: boolean;
  //Планируемая дата окончания действия договора.
  planned_completion_date: string;
  //Договор пролонгирован. true - пролонгирован, false - не пролонгирован.
  rollover: boolean;
  //Дата пролонгации договора.
  rollover_date: string | null;
  //Дата заключения договора.
  signing_date: string;
  //Статус договора в ГИС ЖКХ (редактируется / в процессе утверждения / рассмотрен / отклонен / утвержден / расторгнут / аннулирован).
  status: typeof ManagementContractsStatus;
  //Дата последней синхронизации данных с ГИС ЖКХ.
  sync_date: string;
  //Договор расторгнут/не расторгнут. Если true - расторгнут, false - не расторгнут.
  terminated_in_gis: boolean;
  //Код причины расторжения договора по справочнику НСИ №54 "Причина расторжения договора"
  termination_reason_code: string | null;
  //Срок действия договора (месяцев).
  validity_month: number;
  //Срок действия договора (лет).
  validity_year: number;
  //Идентификатор версии договора управления в ГИС ЖКХ.
  version_guid: string;
  //Протоколы к договору управления
  protocols: ManagementContractProtocol[];
  //Элемент справочника НСИ №58 "Основание заключения договора"
  contractBase: ContractBase;
}