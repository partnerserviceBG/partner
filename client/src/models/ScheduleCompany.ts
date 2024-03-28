import { InfoFields } from '@models/InfoFields.ts';

export type ScheduleCompany = {
  [key: string]: InfoFields;
  organizationOperatingHours: InfoFields;
  break: InfoFields;
  personalByDirector: InfoFields;
} & {
  id: number;
};
