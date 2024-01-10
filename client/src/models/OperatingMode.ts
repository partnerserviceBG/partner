import { InfoFields } from '@models/InfoFields.ts';

export interface OperatingMode {
  organizationOperatingHours: InfoFields;
  break: InfoFields;
  personalByDirector: InfoFields;
}
