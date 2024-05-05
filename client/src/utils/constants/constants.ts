type Util = {
  [key: string]: string
}
export const HouseType: Util = {
  apartment: 'Многоквартирный',
  residential: 'Жилой дом',
}

export const ManagementContractsStatus: Util = {
  Project: 'Редактируется',
  ApprovalProcess: 'В процессе утверждения',
  Reviewed: 'Рассмотрен',
  Rejected: 'Отклонен',
  Approved: 'Утвержден',
  Terminated: 'Расторгнут',
  Annul: 'Аннулирован'
}

export const DeviceType:Util = {
  collective_device: 'Коллективный(общедомовой)',
  individual_device:'Индивидуальный',
  living_room_device: 'Комнатный',
  collective_apartment_device: 'Общий(квартирный)',
}

export const ContractType: Util = {
  offer: 'Договор-оферта',
  mc:'Договор с управляющей организацией',
  owner: 'Прямой договор',
  sole_owner: 'Прямой договор с единоличным собственником помещений в МКД',
  apartment_building_representative_owner: 'Договор с представителем собственников МКД',
}

export const CounterPartyType: Util = {
  organization: 'Организация',
  person: 'Частное лицо',
}

export const PropertyType: Util = {
  living_house:'Жилой дом',
  apartment_building: 'Многоквартирный дом',
}
export const ProtocolType: Util = {
  ok: 'Протокол открытого конкурса',
  meetingOwners: 'Протокол собрания собственников',
  meetingBoard: 'Протокол заседания правления',
  buildingOwner: 'Документ, подтверждающий принятое решение органом управления застройщика',
}