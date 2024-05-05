import { ProtocolType } from '@utils/constants/constants.ts';

export interface ManagementContractProtocol {
  id: number;
  // Тип протокола (протокол открытого конкурса / протокол собрания собственников / протокол заседания правления / документ, подтверждающий принятое решение органом управления застройщика).
  type: typeof ProtocolType
  // Номер извещения (обязателен для протокола открытого конкурса).
  purchase_number: string;

}