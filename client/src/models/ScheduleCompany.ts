import { InfoFields } from '@models/InfoFields.ts';

export interface ScheduleCompany {
  id: number;
  organizationOperatingHours: InfoFields;
  break: InfoFields;
  personalByDirector: InfoFields;
}
